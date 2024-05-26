import './global.css'

import { Analytics } from '@vercel/analytics/react'
import { NextIntlClientProvider, useMessages } from 'next-intl'
import { Suspense } from 'react'
import { Metadata } from 'next'
import GoogleAnalytics from './GoogleAnalytics'
import Loading from './loading'
import { siteConfig } from '@/config/site'
import { Header } from '@/components/Home/Header'

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  themeColor: siteConfig.themeColor,
  icons: siteConfig.icons,
  metadataBase: siteConfig.metadataBase,
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = useMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="relative mx-auto flex min-h-screen flex-col bg-tap4-black text-white">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <Navigation /> */}
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextIntlClientProvider>

        {process.env.NODE_ENV === 'development' ? (
          <></>
        ) : (
          <>
            <Analytics />
            <GoogleAnalytics />
          </>
        )}
      </body>
    </html>
  )
}
