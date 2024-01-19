// tailwind.config.js

import type {Config} from 'tailwindcss'

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            fontFamily: {
                sans: ['var(--font-inter)'],
            },
            fontSize: {
                'xs': '12px',
                's': '14px',
                'm': '16px',
                'l': '18px',
                'xl': '20px',
                'xxl': '26px',

            },
            lineHeight: {
                'tight': '1.44',  // 36 px
                'normal': '1.5',  // 24 px
                'loose': '1.75',  // 16 px
            },
            colors: {
                'primary-100': '#73A5FF',
                'primary-300': '#4C8DFF',
                'primary-500': '#397DF6',
                'primary-700': '#2F68CC',
                'primary-900': '#234E99',
                'success-100': '#80FFBF',
                'success-300': '#22E584',
                'success-500': '#14CC70',
                'success-700': '#0F9954',
                'success-900': '#0A6638',
                'warning-100': '#FFD073',
                'warning-300': '#E5AC39',
                'warning-500': '#D99000',
                'warning-700': '#960',
                'warning-900': '#640',
                'danger-100': '#FF8099',
                'danger-300': '#F23D61',
                'danger-500': '#CC1439',
                'danger-700': '#990F2B',
                'danger-900': '#660A1D',
                'dark-100': '#4C4C4C',
                'dark-300': '#333333',
                'dark-500': '#171717',
                'dark-700': '#0D0D0D',
                'dark-900': '#000000',
                'light-100': '#FFFFFF',
                'light-300': '#F7FBFF',
                'light-500': '#EDF3FA',
                'light-700': '#D5DAE0',
                'light-900': '#8D9094',
            }
        },
    },
    plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
        // Add other Tailwind CSS plugins if needed
    ],
}

export default config
