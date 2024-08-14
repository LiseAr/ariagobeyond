import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppContext } from './AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ÁrIA - Go Beyond',
  description: 'Voice Assistant for WebApps'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR'>
      <body className={inter.className}>
        <AppContext>{children}</AppContext>
      </body>
    </html>
  )
}
