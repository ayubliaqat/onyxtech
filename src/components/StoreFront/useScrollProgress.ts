'use client'

import { useEffect, useState } from 'react'

export const useScrollProgress = (maxScroll: number = 600): number => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const value = Math.min(window.scrollY / maxScroll, 1)
      setProgress(value)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [maxScroll])

  return progress
}
