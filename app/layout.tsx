import type { Metadata } from 'next'
import './globals.css'
import { Footer } from '@/components/Footer'


export const metadata: Metadata = {
  title: '席替えくん',
  description: '席替えアプリです',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="jp">
      <body>
        {children}
        <Footer />
      </body>
      
    </html>
  )
}
