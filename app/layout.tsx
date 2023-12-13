import type { Metadata } from 'next'
import './globals.css'


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
      <body>{children}</body>
    </html>
  )
}
