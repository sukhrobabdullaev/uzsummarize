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

// SVG flag components (from Wikimedia, simplified for inline use)
const UZFlag = () => (
    <svg width="20" height="14" viewBox="0 0 500 350" aria-label="Uzbekistan flag">
        <rect width="500" height="350" fill="#0099b5" />
        <rect y="233.33" width="500" height="116.67" fill="#1eb53a" />
        <rect y="116.67" width="500" height="116.66" fill="#fff" />
        <rect y="116.67" width="500" height="13.33" fill="#ce1126" />
        <circle cx="60" cy="60" r="35" fill="#fff" />
        <circle cx="70" cy="60" r="28" fill="#0099b5" />
        {/* 12 stars */}
        <g fill="#fff">
            <circle cx="120" cy="30" r="5" />
            <circle cx="140" cy="40" r="5" />
            <circle cx="160" cy="50" r="5" />
            <circle cx="180" cy="60" r="5" />
            <circle cx="200" cy="70" r="5" />
            <circle cx="220" cy="80" r="5" />
            <circle cx="120" cy="90" r="5" />
            <circle cx="140" cy="100" r="5" />
            <circle cx="160" cy="110" r="5" />
            <circle cx="180" cy="120" r="5" />
            <circle cx="200" cy="130" r="5" />
            <circle cx="220" cy="140" r="5" />
        </g>
    </svg>
);

const USFlag = () => (
    <svg width="20" height="14" viewBox="0 0 7410 3900" aria-label="United States flag">
        <rect width="7410" height="3900" fill="#b22234" />
        <g fill="#fff">
            <rect y="300" width="7410" height="300" />
            <rect y="900" width="7410" height="300" />
            <rect y="1500" width="7410" height="300" />
            <rect y="2100" width="7410" height="300" />
            <rect y="2700" width="7410" height="300" />
            <rect y="3300" width="7410" height="300" />
        </g>
        <rect width="2964" height="2100" fill="#3c3b6e" />
        <g fill="#fff">
            {Array.from({ length: 9 }).map((_, row) =>
                Array.from({ length: row % 2 === 0 ? 6 : 5 }).map((_, col) => (
                    <circle
                        key={`${row}-${col}`}
                        cx={col * 494 + (row % 2 === 0 ? 247 : 494)}
                        cy={row * 233 + 210}
                        r="90"
                    />
                ))
            )}
        </g>
    </svg>
);

const RUFlag = () => (
    <svg width="20" height="14" viewBox="0 0 900 600" aria-label="Russian flag">
        <rect width="900" height="600" fill="#fff" />
        <rect y="200" width="900" height="200" fill="#0039a6" />
        <rect y="400" width="900" height="200" fill="#d52b1e" />
    </svg>
);

const languages = [
    {
        code: 'uz',
        name: "O'zbekcha",
        flag: <UZFlag />
    },
    {
        code: 'en',
        name: 'English',
        flag: <USFlag />
    },
    {
        code: 'ru',
        name: 'Русский',
        flag: <RUFlag />
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