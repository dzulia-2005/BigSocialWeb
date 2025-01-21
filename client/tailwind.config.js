/** @type {import('tailwindcss').Config} */
import tailwindcssAnimate from 'tailwindcss-animate';

export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            colors: {
                background: {
                    DEFAULT: 'hsl(var(--background))',
                    light: '#FFFFFF', // light mode main background
                    dark: '#1F1F1F',   // dark mode main background
                },
                foreground: {
                    DEFAULT: 'hsl(var(--foreground))',
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                primary: {
                    DEFAULT: 'hsl(var(--primary))',
                    foreground: 'hsl(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                accent: {
                    DEFAULT: 'hsl(var(--accent))',
                    foreground: 'hsl(var(--accent-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                border: {
                    light: 'hsl(var(--border))',
                    dark: 'hsl(var(--border))',
                },
                input: {
                    light: 'hsl(var(--input))',
                    dark: 'hsl(var(--input))',
                },
                ring: {
                    light: 'hsl(var(--ring))',
                    dark: 'hsl(var(--ring))',
                },
                chart: {
                    '1': 'hsl(var(--chart-1))',
                    '2': 'hsl(var(--chart-2))',
                    '3': 'hsl(var(--chart-3))',
                    '4': 'hsl(var(--chart-4))',
                    '5': 'hsl(var(--chart-5))'
                },
                text: {
                    DEFAULT: '#000000', // Always black text
                },
                white: 'transparent',  // აქ დავაშალეთ თეთრი ფერი
                black: '#000000', // ფიქსირებული შავი ფერი
                gray: {
                    DEFAULT: '#1f1f1f', // შეგიძლიათ აირჩიოთ სხვა გრავიც თუნდაც ჩრდილში იყოს
                },
                // საჭიროების შემთხვევაში წაშალეთ ან დაამატეთ სხვა ფერები
            }
        }
    },
    plugins: [tailwindcssAnimate],
};
