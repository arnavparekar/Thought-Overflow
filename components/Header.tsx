'use client'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import ThemeToggle from './ThemeToggle'
import { motion } from 'framer-motion'

export default function Header() {
  const { data: session } = useSession()

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full z-50 terminal-border"
    >
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-mono font-bold gradient-text">
          ~/dev-blog
        </Link>
        
        <nav className="flex items-center gap-6">
          <Link href="/" className="hover:text-blue-400 transition-colors">
            Home
          </Link>
          {session && (
            <Link href="/blog/new" className="hover:text-green-400 transition-colors">
              New Post
            </Link>
          )}
          <ThemeToggle />
          {session ? (
            <button onClick={() => signOut()} className="text-red-400 hover:text-red-300">
              Sign Out
            </button>
          ) : (
            <button onClick={() => signIn('github')} className="text-green-400 hover:text-green-300">
              Sign In
            </button>
          )}
        </nav>
      </div>
    </motion.header>
  )
}