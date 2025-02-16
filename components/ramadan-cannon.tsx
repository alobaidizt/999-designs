'use client'

import { useState, useCallback } from 'react'

export default function RamadanCannon() {
  const [isFiring, setIsFiring] = useState(false)
  const [smokeElements, setSmokeElements] = useState<number[]>([])

  const fireCannon = useCallback(() => {
    if (!isFiring) {
      setIsFiring(true)
      setSmokeElements([Date.now()])
      
      // Reset cannon state after animation
      setTimeout(() => {
        setIsFiring(false)
        setTimeout(() => setSmokeElements([]), 2000)
      }, 500) // Reduced to match new recoil animation timing
    }
  }, [isFiring])

  return (
    <div className="fixed bottom-0 left-0 right-0 z-20">
      {/* Citadel Platform */}
      <div className="cannon-platform h-40 mx-auto max-w-3xl relative">
        {/* Flash Effect */}
        {isFiring && (
          <div
            className="cannon-flash"
            style={{
              left: '80%',
              bottom: '70%',
              width: '80px',
              height: '80px',
              background: 'radial-gradient(circle, rgba(255,200,0,0.9) 0%, rgba(255,150,0,0.6) 40%, rgba(255,100,0,0) 70%)'
            }}
          />
        )}
        
        {/* Smoke Effects */}
        {smokeElements.map((key) => (
          <div
            key={key}
            className="cannon-smoke"
            style={{
              left: '80%',
              bottom: '70%',
              width: '60px',
              height: '60px',
              background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,200,200,0.6) 40%, rgba(169,169,169,0) 70%)'
            }}
          />
        ))}
        
        {/* Cannon */}
        <div 
          className={`cannon absolute transform cursor-pointer ${isFiring ? 'firing pointer-events-none' : ''}`}
          onClick={fireCannon}
        >
          <svg width="300" height="150" viewBox="0 0 300 150">
            {/* Decorative Base Platform */}
            {/* <path
              d="M50,130 H250 C270,130 280,120 280,110 L280,100 C280,90 270,80 250,80 H50 C30,80 20,90 20,100 L20,110 C20,120 30,130 50,130 Z"
              fill="#8B4513"
              stroke="#654321"
              strokeWidth="3"
            /> */}
            
            {/* Main Cannon Body */}
            <path
              d="M80,90 L220,90 C235,90 245,85 245,75 L245,55 C245,45 235,40 220,40 L80,40 C65,40 55,45 55,55 L55,75 C55,85 65,90 80,90 Z"
              fill="#CD853F"
              stroke="#8B4513"
              strokeWidth="3"
            />

            {/* Left Wheel */}
            <circle cx="100" cy="110" r="20" fill="#8B4513" stroke="#654321" strokeWidth="3" />
            <circle cx="100" cy="110" r="15" fill="#A0522D" stroke="#8B4513" strokeWidth="2" />
            <line x1="100" y1="90" x2="100" y2="130" stroke="#654321" strokeWidth="2" />
            <line x1="80" y1="110" x2="120" y2="110" stroke="#654321" strokeWidth="2" />
            
            {/* Right Wheel */}
            <circle cx="200" cy="110" r="20" fill="#8B4513" stroke="#654321" strokeWidth="3" />
            <circle cx="200" cy="110" r="15" fill="#A0522D" stroke="#8B4513" strokeWidth="2" />
            <line x1="200" y1="90" x2="200" y2="130" stroke="#654321" strokeWidth="2" />
            <line x1="180" y1="110" x2="220" y2="110" stroke="#654321" strokeWidth="2" />
            
            {/* Cannon Barrel */}
            <path
              d="M230,50 L280,45 C290,44 295,48 295,55 L295,75 C295,82 290,86 280,85 L230,80"
              fill="#CD853F"
              stroke="#8B4513"
              strokeWidth="3"
            />
            
            {/* Decorative Rings */}
            <circle cx="100" cy="65" r="15" fill="#DAA520" stroke="#B8860B" strokeWidth="2" />
            <circle cx="200" cy="65" r="15" fill="#DAA520" stroke="#B8860B" strokeWidth="2" />
            
            {/* Islamic Patterns */}
            <path
              d="M120,55 Q150,45 180,55 Q150,65 120,55"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
            />
            <path
              d="M120,75 Q150,85 180,75 Q150,65 120,75"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
            />
            
            {/* Wheel Supports */}
            <circle cx="100" cy="110" r="12" fill="#8B4513" stroke="#654321" strokeWidth="2" />
            <circle cx="200" cy="110" r="12" fill="#8B4513" stroke="#654321" strokeWidth="2" />
          </svg>
        </div>
      </div>
      
      {/* Instruction Text */}
      <div className="text-center text-sm text-amber-200 mb-4 pointer-events-none font-arabic">
        Click the cannon to signal Iftar
      </div>
    </div>
  )
} 