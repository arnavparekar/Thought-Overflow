'use client'
import { useTheme } from 'next-themes'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-lg terminal-border"
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  )
}