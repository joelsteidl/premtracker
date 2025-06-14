import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'
import { SeasonProvider } from './lib/SeasonContext'
import Header from './components/Header'
import './styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' }
  ]
}

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: 'PremTracker 2023/24',
  description: 'Track Premier League standings and statistics for the 2023/24 season',
  icons: {
    apple: [
      { url: '/favicons/apple-icon-57x57.png', sizes: '57x57', type: 'image/png' },
      { url: '/favicons/apple-icon-60x60.png', sizes: '60x60', type: 'image/png' },
      { url: '/favicons/apple-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/favicons/apple-icon-76x76.png', sizes: '76x76', type: 'image/png' },
      { url: '/favicons/apple-icon-114x114.png', sizes: '114x114', type: 'image/png' },
      { url: '/favicons/apple-icon-120x120.png', sizes: '120x120', type: 'image/png' },
      { url: '/favicons/apple-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/favicons/apple-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/favicons/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicons/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/favicons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { rel: 'icon', url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
    ],
  },
  manifest: '/favicons/manifest.json',
  other: {
    'msapplication-TileColor': '#ffffff',
    'msapplication-TileImage': '/favicons/ms-icon-144x144.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <SeasonProvider>
          <div className="container">
            <Header />
            <main>
              {children}
            </main>
            <footer>
              <p>Standings and team data provided by <a href="https://www.football-data.org/">football-data.org</a>. Stadium capacities provided by Wikipedia (Updated Dec 2024). Salary data provided by <a href="https://www.spotrac.com/epl/payroll/">spotrac.com</a>. (Updated Dec 2024) Not associated with the Premier League.</p>
            </footer>
          </div>
        </SeasonProvider>
      </body>
    </html>
  )
}
