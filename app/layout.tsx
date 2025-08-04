import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PoliticalCorner - Political Philosophy Discussions',
  description: 'A platform for political and economic discussions organized by continents with Thesis/Counter Thesis/Synthesis format.',
  keywords: 'political philosophy, economics, discussions, thesis, synthesis, global politics',
  authors: [{ name: 'PaoloTCS' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-secondary-100">
          {children}
        </div>
      </body>
    </html>
  )
} 