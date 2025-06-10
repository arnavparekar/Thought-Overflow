
// app/layout.tsx
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'DevBlog - Modern Developer Journal',
  description: 'A modern developer blog for sharing code, insights, and journey',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans antialiased`}>
        <Providers>
          <div className="min-h-screen relative">
            <Header />
            <main className="pt-24 pb-16">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}