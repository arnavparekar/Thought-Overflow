'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'

export default function Header() {
  const { data: session } = useSession()

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 w-full z-50 backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/50"
    >
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="group flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="text-xl font-bold gradient-text group-hover:scale-105 transition-transform">
              DevBlog
            </span>
          </Link>
          
          <nav className="flex items-center gap-8">
            <Link 
              href="/" 
              className="text-slate-300 hover:text-white transition-colors font-medium"
            >
              Home
            </Link>
            {session && (
              <Link 
                href="/blog/new" 
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-all hover:scale-105"
              >
                Write Post
              </Link>
            )}
            
            <div className="flex items-center gap-4">
              <ThemeToggle />
              {session ? (
                <div className="flex items-center gap-3">
                  <img 
                    src={session.user?.image || ''} 
                    alt="Profile" 
                    className="w-8 h-8 rounded-full border-2 border-slate-700"
                  />
                  <button 
                    onClick={() => signOut()} 
                    className="text-slate-400 hover:text-red-400 transition-colors text-sm"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <button 
                  onClick={() => signIn('github')} 
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg font-medium transition-all border border-slate-700"
                >
                  Sign In
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}