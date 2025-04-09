import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mic, MicOff, Volume2, VolumeX, Copy, Trash2, Loader2, Info, ChevronRight, Upload } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "./ui/accordion";
import { checkVoiceRateLimit, getRemainingRequests } from '@/lib/rateLimit';

type VoiceOption = 'alloy' | 'echo' | 'fable' | 'nova';

const ALLOWED_AUDIO_TYPES = ['audio/mp3', 'audio/mpeg', 'audio/wav', 'audio/ogg'];

export function VoiceAssistant() {
    const { t, i18n } = useTranslation();
    const [isRecording, setIsRecording] = useState(false);
    const [transcribedText, setTranscribedText] = useState('');
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [ttsText, setTtsText] = useState('');
    const [selectedVoice, setSelectedVoice] = useState<VoiceOption>('alloy');
    const [speechRate, setSpeechRate] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [showInfo, setShowInfo] = useState(false);
    const [remainingRequests, setRemainingRequests] = useState(getRemainingRequests());
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const streamRef = useRef<MediaStream | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Force translation refresh when component mounts
    useEffect(() => {
        const currentLang = i18n.language;
        i18n.changeLanguage(currentLang);
    }, [i18n]);

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                setRecordingTime(0);
            }
        }
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRecording]);

    useEffect(() => {
        setRemainingRequests(getRemainingRequests());
    }, [isRecording, isSpeaking]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const startRecording = async () => {
        try {
            checkVoiceRateLimit('stt', t);
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 16000
                }
            });
            streamRef.current = stream;

            const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
                ? 'audio/webm;codecs=opus'
                : 'audio/webm';
            const mediaRecorder = new MediaRecorder(stream, {
                mimeType,
                audioBitsPerSecond: 128000
            });
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                setIsProcessing(true);
                try {
                    const audioBlob = new Blob(audioChunksRef.current, { type: mimeType });
                    await transcribeAudio(audioBlob);
                } catch (error) {
                    console.error('Recording transcription error:', error);
                    toast.error(t('voiceAssistant.toasts.transcriptionError'));
                } finally {
                    setIsProcessing(false);
                }
            };

            mediaRecorder.start(1000);
            setIsRecording(true);
            toast.success(t('voiceAssistant.toasts.recordingStarted'));
        } catch (error) {
            console.error('Recording error:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(t('voiceAssistant.toasts.microphoneDenied'));
            }
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            streamRef.current?.getTracks().forEach(track => track.stop());
            setIsRecording(false);
            toast.success(t('voiceAssistant.toasts.recordingStopped'));
        }
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        console.log('File type:', file.type);
        console.log('File size:', file.size);

        // Check if the file type is one of the allowed types
        if (!ALLOWED_AUDIO_TYPES.includes(file.type)) {
            console.error('Invalid file type:', file.type);
            toast.error(t('voiceAssistant.toasts.invalidFileType'));
            return;
        }

        try {
            setIsProcessing(true);
            console.log('Starting transcription...');
            await transcribeAudio(file);
        } catch (error) {
            console.error('File upload error:', error);
            toast.error(t('voiceAssistant.toasts.transcriptionError'));
        } finally {
            setIsProcessing(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const transcribeAudio = async (audioBlob: Blob) => {
        try {
            const formData = new FormData();
            formData.append('file', audioBlob, 'audio.mp3');

            console.log('Sending request to API...');
            const response = await fetch('https://e3a5-211-206-66-162.ngrok-free.app/transcribe/', {
                method: 'POST',
                body: formData,
            });

            console.log('Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('API Error Response:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('API Response:', data);

            if (data.transcription) {
                setTranscribedText(data.transcription);
                toast.success(t('voiceAssistant.toasts.transcriptionSuccess'));
            } else {
                throw new Error('No transcription in response');
            }
        } catch (error) {
            console.error('Transcription error:', error);
            toast.error(t('voiceAssistant.toasts.transcriptionError'));
            throw error;
        }
    };

    const speakText = async (text: string) => {
        if (!text) {
            toast.error(t('voiceAssistant.toasts.textRequired'));
            return;
        }

        try {
            checkVoiceRateLimit('tts', t);
            setIsSpeaking(true);
            const response = await fetch('https://api.openai.com/v1/audio/speech', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'tts-1',
                    input: text,
                    voice: selectedVoice,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const audioBlob = await response.blob();
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.playbackRate = speechRate;

            audio.onended = () => {
                setIsSpeaking(false);
                URL.revokeObjectURL(audioUrl);
            };

            await audio.play();
        } catch (error) {
            console.error('Speech error:', error);
            if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error(t('voiceAssistant.toasts.speechError'));
            }
            setIsSpeaking(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success(t('voiceAssistant.toasts.textCopied'));
    };

    const clearText = () => {
        setTtsText('');
        setTranscribedText('');
        toast.success(t('voiceAssistant.toasts.textCleared'));
    };

    return (
        <div className="space-y-6 sm:space-y-8">
            {/* Info Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                    <CardContent className="p-4 sm:p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Info className="h-5 w-5 text-primary" />
                                <span className="text-sm font-medium">{t('voiceAssistant.remainingRequests', { count: remainingRequests })}</span>
                            </div>
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="info" className="border-none">
                                <AccordionTrigger className="hover:no-underline px-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                            <Info className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-lg sm:text-xl font-semibold">{t('voiceAssistant.howToUse.title')}</h3>
                                            <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.subtitle')}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="px-0">
                                    <div className="space-y-6 pt-4">
                                        {/* Text to Speech Guide */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-sm font-semibold text-primary">1</span>
                                                </div>
                                                <h4 className="text-base font-semibold">{t('voiceAssistant.howToUse.textToSpeech.title')}</h4>
                                            </div>
                                            <div className="pl-8 space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.textToSpeech.steps.enterText')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.textToSpeech.steps.chooseVoice')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.textToSpeech.steps.adjustSpeed')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.textToSpeech.steps.clickSpeak')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Speech to Text Guide */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                    <span className="text-sm font-semibold text-primary">2</span>
                                                </div>
                                                <h4 className="text-base font-semibold">{t('voiceAssistant.howToUse.speechToText.title')}</h4>
                                            </div>
                                            <div className="pl-8 space-y-2">
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.speechToText.steps.clickRecord')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.speechToText.steps.speakClearly')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.speechToText.steps.clickStop')}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <ChevronRight className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                                                    <div>
                                                        <p className="text-sm text-muted-foreground">{t('voiceAssistant.howToUse.speechToText.steps.viewTranscription')}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Tips Section */}
                                        <div className="pt-4 border-t border-border/50">
                                            <h4 className="text-sm font-semibold text-primary mb-2">{t('voiceAssistant.howToUse.proTips.title')}</h4>
                                            <ul className="space-y-2 text-sm text-muted-foreground">
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{t('voiceAssistant.howToUse.proTips.tips.quietEnvironment')}</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{t('voiceAssistant.howToUse.proTips.tips.adjustSpeed')}</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{t('voiceAssistant.howToUse.proTips.tips.tryVoices')}</span>
                                                </li>
                                                <li className="flex items-start gap-2">
                                                    <span className="text-primary">•</span>
                                                    <span>{t('voiceAssistant.howToUse.proTips.tips.copyText')}</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </CardContent>
                </Card>
            </motion.div>

            {/* TTS Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader className="p-4 sm:p-6">
                        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                            <Volume2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
                            {t('voiceAssistant.textToSpeech.title')}
                        </CardTitle>
                        <CardDescription className="text-sm sm:text-base">
                            {t('voiceAssistant.textToSpeech.description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4 p-4 sm:p-6">
                        <Textarea
                            placeholder={t('voiceAssistant.textToSpeech.placeholder')}
                            value={ttsText}
                            onChange={(e) => setTtsText(e.target.value)}
                            className="min-h-[100px] resize-none text-sm sm:text-base"
                            aria-label={t('voiceAssistant.textToSpeech.title')}
                        />
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-full sm:w-48">
                                                <Select
                                                    value={selectedVoice}
                                                    onValueChange={(value: VoiceOption) => setSelectedVoice(value)}
                                                >
                                                    <SelectTrigger className="w-full">
                                                        <SelectValue placeholder={t('voiceAssistant.textToSpeech.voice.label')} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="alloy">{t('voiceAssistant.textToSpeech.voice.alloy')}</SelectItem>
                                                        <SelectItem value="echo">{t('voiceAssistant.textToSpeech.voice.echo')}</SelectItem>
                                                        <SelectItem value="fable">{t('voiceAssistant.textToSpeech.voice.fable')}</SelectItem>
                                                        <SelectItem value="nova">{t('voiceAssistant.textToSpeech.voice.nova')}</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('voiceAssistant.textToSpeech.voice.label')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="w-full sm:w-48">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm text-muted-foreground whitespace-nowrap">{t('voiceAssistant.textToSpeech.speed.label')}:</span>
                                                    <Slider
                                                        value={[speechRate]}
                                                        onValueChange={(value) => setSpeechRate(value[0])}
                                                        min={0.5}
                                                        max={2}
                                                        step={0.1}
                                                        className="w-full sm:w-24"
                                                        aria-label={t('voiceAssistant.textToSpeech.speed.label')}
                                                    />
                                                </div>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('voiceAssistant.textToSpeech.speed.tooltip')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>
                            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={clearText}
                                                disabled={!ttsText}
                                                aria-label={t('voiceAssistant.textToSpeech.buttons.clear')}
                                                className="h-9 w-9 sm:h-10 sm:w-10"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('voiceAssistant.textToSpeech.buttons.clear')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <Button
                                    onClick={() => speakText(ttsText)}
                                    disabled={!ttsText || isSpeaking}
                                    variant="outline"
                                    size="lg"
                                    className="w-full sm:w-32 h-9 sm:h-10"
                                    aria-label={isSpeaking ? t('voiceAssistant.textToSpeech.buttons.stop') : t('voiceAssistant.textToSpeech.buttons.speak')}
                                >
                                    {isSpeaking ? (
                                        <>
                                            <VolumeX className="mr-2 h-4 w-4" />
                                            {t('voiceAssistant.textToSpeech.buttons.stop')}
                                        </>
                                    ) : (
                                        <>
                                            <Volume2 className="mr-2 h-4 w-4" />
                                            {t('voiceAssistant.textToSpeech.buttons.speak')}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* STT Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="border-2 hover:border-primary/50 transition-colors">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Mic className="h-5 w-5 text-primary" />
                            {t('voiceAssistant.speechToText.title')}
                        </CardTitle>
                        <CardDescription>
                            {t('voiceAssistant.speechToText.description')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col sm:flex-row items-center gap-4">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                onClick={isRecording ? stopRecording : startRecording}
                                                variant={isRecording ? "destructive" : "default"}
                                                size="lg"
                                                className={cn(
                                                    "w-32 transition-all duration-300",
                                                    isRecording && "animate-pulse"
                                                )}
                                                aria-label={isRecording ? t('voiceAssistant.speechToText.buttons.stop') : t('voiceAssistant.speechToText.buttons.record')}
                                            >
                                                {isRecording ? (
                                                    <>
                                                        <MicOff className="mr-2 h-4 w-4" />
                                                        {t('voiceAssistant.speechToText.buttons.stop')}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Mic className="mr-2 h-4 w-4" />
                                                        {t('voiceAssistant.speechToText.buttons.record')}
                                                    </>
                                                )}
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{isRecording ? t('voiceAssistant.speechToText.buttons.stop') : t('voiceAssistant.speechToText.buttons.record')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>

                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    ref={fileInputRef}
                                                    onChange={handleFileUpload}
                                                    accept=".mp3,.wav,.ogg"
                                                    className="hidden"
                                                    aria-label={t('voiceAssistant.speechToText.buttons.upload')}
                                                />
                                                <Button
                                                    onClick={() => fileInputRef.current?.click()}
                                                    variant="outline"
                                                    size="lg"
                                                    className="w-32"
                                                    disabled={isProcessing}
                                                >
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    {t('voiceAssistant.speechToText.buttons.upload')}
                                                </Button>
                                            </div>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>{t('voiceAssistant.speechToText.buttons.upload')}</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </div>

                            {isRecording && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-2xl font-mono"
                                    role="timer"
                                    aria-live="polite"
                                >
                                    {formatTime(recordingTime)}
                                </motion.div>
                            )}
                        </div>

                        <AnimatePresence>
                            {isProcessing && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="flex items-center justify-center gap-2 text-muted-foreground"
                                    role="status"
                                    aria-label={t('voiceAssistant.speechToText.processing')}
                                >
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>{t('voiceAssistant.speechToText.processing')}</span>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {transcribedText && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 p-4 bg-muted rounded-lg relative group"
                            >
                                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => copyToClipboard(transcribedText)}
                                                    aria-label={t('voiceAssistant.speechToText.transcribedText.copy')}
                                                >
                                                    <Copy className="h-4 w-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{t('voiceAssistant.speechToText.transcribedText.copy')}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                </div>
                                <h3 className="font-medium mb-2">{t('voiceAssistant.speechToText.transcribedText.title')}</h3>
                                <p className="text-sm whitespace-pre-wrap">{transcribedText}</p>
                            </motion.div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
} 