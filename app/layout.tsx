import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import { ThemeProvider } from 'next-themes'
import { Providers } from './providers'
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'DevBlog - Code, Learn, Share',
  description: 'A developer blog for sharing code, insights, and journey',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrains.variable} font-sans`}>
        <Providers>
          <Header />
          <main className="min-h-screen pt-20">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}

// export default function RootLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en" suppressHydrationWarning>
//       <body className={`${inter.variable} ${jetbrains.variable} font-sans bg-gray-950 text-gray-100`}>
//         <ThemeProvider attribute="class" defaultTheme="dark">
//           <Header />
//           <main className="min-h-screen pt-20">
//             {children}
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }