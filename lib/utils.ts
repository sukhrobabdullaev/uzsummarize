import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertUzbekLatinToCyrillic(input: string): string {
  const replacements: [RegExp, string][] = [
    // Multi-letter combos (lowercase)
    [/o'/g, 'ў'],
    [/g'/g, 'ғ'],
    [/sh/g, 'ш'],
    [/ch/g, 'ч'],
    [/yo/g, 'ё'],
    [/yu/g, 'ю'],
    [/ya/g, 'я'],
    [/ts/g, 'ц'],

    // Multi-letter combos (uppercase)
    [/O'/g, 'Ў'],
    [/G'/g, 'Ғ'],
    [/Sh/g, 'Ш'],
    [/Ch/g, 'Ч'],
    [/Yo/g, 'Ё'],
    [/Yu/g, 'Ю'],
    [/Ya/g, 'Я'],
    [/Ts/g, 'Ц'],

    // Single letters
    [/a/g, 'а'],
    [/b/g, 'б'],
    [/d/g, 'д'],
    [/e/g, 'е'],
    [/f/g, 'ф'],
    [/g/g, 'г'],
    [/h/g, 'ҳ'],
    [/i/g, 'и'],
    [/j/g, 'ж'],
    [/k/g, 'к'],
    [/l/g, 'л'],
    [/m/g, 'м'],
    [/n/g, 'н'],
    [/o/g, 'о'],
    [/p/g, 'п'],
    [/q/g, 'қ'],
    [/r/g, 'р'],
    [/s/g, 'с'],
    [/t/g, 'т'],
    [/u/g, 'у'],
    [/v/g, 'в'],
    [/x/g, 'х'],
    [/y/g, 'й'],
    [/z/g, 'з'],

    // Uppercase single letters
    [/A/g, 'А'],
    [/B/g, 'Б'],
    [/D/g, 'Д'],
    [/E/g, 'Е'],
    [/F/g, 'Ф'],
    [/G/g, 'Г'],
    [/H/g, 'Ҳ'],
    [/I/g, 'И'],
    [/J/g, 'Ж'],
    [/K/g, 'К'],
    [/L/g, 'Л'],
    [/M/g, 'М'],
    [/N/g, 'Н'],
    [/O/g, 'О'],
    [/P/g, 'П'],
    [/Q/g, 'Қ'],
    [/R/g, 'Р'],
    [/S/g, 'С'],
    [/T/g, 'Т'],
    [/U/g, 'У'],
    [/V/g, 'В'],
    [/X/g, 'Х'],
    [/Y/g, 'Й'],
    [/Z/g, 'З'],
  ];

  let output = input;
  for (const [pattern, replacement] of replacements) {
    output = output.replace(pattern, replacement);
  }
  return output;
}
