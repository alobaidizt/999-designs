'use client'

import { useState } from 'react'
import RamadanLights from '@/components/ramadan-lights'
import DiwaliLights from '@/components/diwali-lights'
import RamadanCannon from '@/components/ramadan-cannon'
import HalftoneWave from '@/components/halftone-wave'
import AshuraCommemoration from '@/components/ashura-commemoration'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [theme, setTheme] = useState<'ramadan' | 'diwali' | 'halftone' | 'ashura'>('ramadan')

  return (
    <html lang="en">
      <body className="relative min-h-screen">
        {theme === 'ramadan' && <RamadanLights />}
        {theme === 'diwali' && <DiwaliLights />}
        {theme === 'halftone' && <HalftoneWave />}
        {theme === 'ashura' && <AshuraCommemoration />}
        <main className="fixed z-10 min-h-screen flex items-center justify-center">
          <div className="container p-8 flex flex-col items-center">
            {/* Theme Switcher */}
            <div className="fixed top-4 right-4 z-30">
              <Select
                value={theme}
                onValueChange={(value: 'ramadan' | 'diwali' | 'halftone' | 'ashura') => setTheme(value)}
              >
                <SelectTrigger className="w-[180px] bg-white/20 backdrop-blur-md border-white/20 text-white">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent className="bg-white/20 backdrop-blur-md border-white/20">
                  <SelectItem value="ramadan" className="text-white hover:bg-white/10 focus:bg-white/10">Ramadan Theme</SelectItem>
                  <SelectItem value="diwali" className="text-white hover:bg-white/10 focus:bg-white/10">Diwali Theme</SelectItem>
                  <SelectItem value="halftone" className="text-white hover:bg-white/10 focus:bg-white/10">Halftone Wave</SelectItem>
                  <SelectItem value="ashura" className="text-white hover:bg-white/10 focus:bg-white/10">Ashura</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-amber-400 to-yellow-600 mb-8 text-center animate-glow fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              {theme === 'ramadan' && 'Ramadan Kareem'}
              {theme === 'diwali' && 'Happy Diwali'}
              {theme === 'halftone' && 'Halftone Wave'}
              {theme === 'ashura' && 'Ashura Commemoration'}
            </h1>
            {children}
          </div>
        </main>
        {theme === 'ramadan' && <RamadanCannon />}
      </body>
    </html>
  )
} 