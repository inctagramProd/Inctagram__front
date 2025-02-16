/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    i18n: {
        locales: ['en', 'ru'],
        defaultLocale: 'ru',
    },
    images: {
        domains: ['drive.google.com'],
    },
}

module.exports = nextConfig
