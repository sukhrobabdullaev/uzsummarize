'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Loader2 } from 'lucide-react';

export function UrlSummarizer() {
    const [url, setUrl] = useState('');
    const [model, setModel] = useState('gemini');
    const [summary, setSummary] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSummary('');

        try {
            const response = await fetch('/api/summarize-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url, model }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to summarize URL');
            }

            const data = await response.json();
            setSummary(data.summary);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to summarize URL. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>URL xulosasi</CardTitle>
                <CardDescription>
                    URL ni kiriting va AI modelini tanlang
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex gap-2">
                        <Input
                            type="url"
                            placeholder="URL ni kiriting"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            required
                            className="flex-1"
                        />
                        <Select value={model} onValueChange={setModel}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="gpt">GPT</SelectItem>
                                <SelectItem value="gemini">Gemini</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button type="submit" disabled={loading} className="w-full">
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Xulosa olinyapti...
                            </>
                        ) : (
                            'Xulosa olish'
                        )}
                    </Button>
                </form>

                {error && (
                    <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-md">
                        {error}
                    </div>
                )}

                {summary && (
                    <div className="mt-6">
                        <h3 className="text-lg font-semibold mb-2">Xulosa Natijasi</h3>
                        <div className="p-4 bg-gray-50 rounded-md">
                            {summary}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
} 