import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import GoogleAnalytics from './GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hand Drawn AI - Where Hand Drawn Art Meets AI Magic',
  description:
    'Hand Drawn AI - Elevate your branding, marketing, and personal projects with unique AI-enhanced hand drawn art',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

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
