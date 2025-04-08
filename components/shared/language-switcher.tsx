"use client"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter, usePathname } from 'next/navigation';

const languages = [
    {
        code: 'uz',
        name: "O'zbekcha", 
        flag: "🇺🇿"
    },
    {
        code: 'en',
        name: 'English',
        flag: "🇬🇧"
    },
    {
        code: 'ru',
        name: 'Русский',
        flag: "🇷🇺"
    },
];

export function LanguageSwitcher({ className = "" }: { className?: string }) {
    
    const router = useRouter();
    const pathname = usePathname();

    // Get current locale from pathname
    const currentLocale = pathname.split('/')[1];

    const currentLanguage = languages.find(lang => lang.code === currentLocale) || languages[0];

    const changeLanguage = (languageCode: string) => {
        // Replace current locale in pathname with new locale
        const newPathname = pathname.replace(`/${currentLocale}`, `/${languageCode}`);
        router.push(newPathname);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size="sm"
                    className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-full hover:bg-accent/50 transition-all duration-200 ${className}`}
                >
                    <span className="text-base sm:text-lg">{currentLanguage.flag}</span>
                    <span className="hidden sm:inline text-sm font-medium">{currentLanguage.name}</span>
                    <span className="sm:hidden text-sm font-medium">{currentLanguage.code.toUpperCase()}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[100px] sm:w-[150px] p-2">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="flex items-center gap-2 px-2 sm:px-3 py-2 cursor-pointer rounded-lg hover:bg-accent/50 transition-all duration-200"
                    >
                        <span className="text-base sm:text-lg">{lang.flag}</span>
                        <span className="flex-1 text-sm font-medium">{lang.name}</span>
                        {currentLocale === lang.code && (
                            <Check className="h-4 w-4 text-primary" />
                        )}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}