import { SiteConfig } from '@/types/siteConfig'

export const siteName = 'Hand Drawn AI'

const baseSiteConfig = {
  name: `${siteName} - Where Hand Drawn Art Meets AI Magic`,
  description: `${siteName} - Elevate your branding, marketing, and personal projects with unique AI-enhanced hand drawn art`,
  url: 'https://www.handdrawn.ai/',
  ogImage: 'https://www.handdrawn.ai/og.png',
  metadataBase: new URL('https://www.handdrawn.ai/'),
  keywords: [siteName, 'hand drawn', 'hand-drawn'],
  authors: [
    {
      name: 'wujieli',
      url: 'https://www.wujieli.com',
    },
  ],
  creator: '@wujieli',
  themeColor: '#fff',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon/favicon-16x16.png',
    apple: '/favicon/apple-touch-icon.png',
  },
  links: {
    twitter: 'https://x.com/li_wujie',
    github: 'https://github.com/wujieli0207/hand-drawn-ai',
  },
}

export const siteConfig: SiteConfig = {
  ...baseSiteConfig,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    siteName: baseSiteConfig.name,
    images: [`${baseSiteConfig.url}og.png`],
  },
  twitter: {
    card: 'summary_large_image',
    site: baseSiteConfig.url,
    title: baseSiteConfig.name,
    description: baseSiteConfig.description,
    images: [`${baseSiteConfig.url}og.png`],
    creator: baseSiteConfig.creator,
  },
}
