'use client'

import { useEffect, useRef } from 'react'

interface Chain {
  id: number
  isWhipping: boolean
  whipTime: number
  startX: number
  swingAngle: number
  swingVelocity: number
}

interface Splatter {
  x: number
  y: number
  radius: number
  opacity: number
  time: number
}

export default function AshuraCommemoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const chainsRef = useRef<Chain[]>([])
  const splattersRef = useRef<Splatter[]>([])
  const timeRef = useRef(0)
  const textGlowIntensityRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const initializeChains = () => {
      const numChains = 8
      chainsRef.current = Array.from({ length: numChains }, (_, i) => ({
        id: i,
        isWhipping: false,
        whipTime: 0,
        startX: (canvas.width / (numChains + 1)) * (i + 1),
        swingAngle: Math.PI / 4 * Math.sin(i), // Initial random angle
        swingVelocity: 0
      }))
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initializeChains()
    }

    const drawDome = (ctx: CanvasRenderingContext2D, centerX: number, centerY: number) => {
      // Draw the dome base
      ctx.beginPath()
      ctx.fillStyle = `rgba(218, 165, 32, ${0.6 + Math.sin(timeRef.current) * 0.2})`
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.8)'
      ctx.lineWidth = 2

      // Dome arch - moved up
      ctx.arc(centerX, centerY, 100, Math.PI, 0)
      ctx.quadraticCurveTo(centerX + 100, centerY - 80, centerX, centerY - 120)
      ctx.quadraticCurveTo(centerX - 100, centerY - 80, centerX - 100, centerY)
      
      ctx.fill()
      ctx.stroke()

      // Dome glow effect - adjusted for new position
      const gradient = ctx.createRadialGradient(
        centerX, centerY - 50, 10,
        centerX, centerY - 50, 150
      )
      gradient.addColorStop(0, 'rgba(255, 223, 0, 0.3)')
      gradient.addColorStop(1, 'rgba(255, 223, 0, 0)')
      
      ctx.fillStyle = gradient
      ctx.fill()
    }

    const drawChains = (ctx: CanvasRenderingContext2D) => {
      const chainLength = 15
      const linkSize = 15
      const gravity = 0.004
      const damping = 0.98

      chainsRef.current.forEach(chain => {
        ctx.strokeStyle = 'rgba(169, 169, 169, 0.7)'
        ctx.lineWidth = 3

        // Update chain physics
        const acceleration = -gravity * Math.sin(chain.swingAngle)
        chain.swingVelocity += acceleration
        chain.swingVelocity *= damping
        chain.swingAngle += chain.swingVelocity

        // Add extra force if whipping
        if (chain.isWhipping) {
          const whipProgress = (timeRef.current - chain.whipTime) * 2
          if (whipProgress < Math.PI) {
            const whipForce = Math.sin(whipProgress) * 0.1
            chain.swingVelocity += whipForce
          } else {
            chain.isWhipping = false
          }
        }

        // Draw chain segments - starting from bottom half
        let prevX = chain.startX
        let prevY = canvas.height * 0.6 // Changed from 0.2 to 0.6

        for (let i = 0; i < chainLength; i++) {
          const segmentAngle = chain.swingAngle * Math.pow(0.95, i)
          const segmentLength = linkSize

          // Calculate current segment position
          const x = prevX + Math.sin(segmentAngle) * segmentLength
          const y = prevY + Math.cos(segmentAngle) * segmentLength

          // Draw chain link
          ctx.beginPath()
          ctx.ellipse(
            x,
            y,
            linkSize / 2,
            linkSize / 3,
            segmentAngle,
            0,
            Math.PI * 2
          )
          ctx.stroke()

          // Connect segments with lines
          if (i > 0) {
            ctx.beginPath()
            ctx.moveTo(prevX, prevY)
            ctx.lineTo(x, y)
            ctx.stroke()
          }

          prevX = x
          prevY = y
        }
      })
    }

    const drawSorrowfulLight = (ctx: CanvasRenderingContext2D) => {
      // Create alternating bands of green and red light
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      gradient.addColorStop(0, 'rgba(0, 100, 0, 0.1)')
      gradient.addColorStop(0.5, 'rgba(139, 0, 0, 0.1)')
      gradient.addColorStop(1, 'rgba(0, 100, 0, 0.1)')

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Add subtle pulsing light spots
      for (let i = 0; i < 5; i++) {
        const x = canvas.width * (i / 4)
        const y = canvas.height * 0.5
        const radius = 100 + Math.sin(timeRef.current + i) * 20

        const spotGradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
        spotGradient.addColorStop(0, i % 2 === 0 ? 'rgba(0, 100, 0, 0.2)' : 'rgba(139, 0, 0, 0.2)')
        spotGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

        ctx.fillStyle = spotGradient
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const createSplatters = (x: number, y: number) => {
      const numSplatters = 15
      const newSplatters = Array.from({ length: numSplatters }, () => ({
        x: x + (Math.random() - 0.5) * 100,
        y: y + (Math.random() - 0.5) * 100,
        radius: 2 + Math.random() * 4,
        opacity: 0.8,
        time: timeRef.current
      }))
      splattersRef.current.push(...newSplatters)
      textGlowIntensityRef.current = 1 // Max glow intensity
    }

    const drawSplatters = (ctx: CanvasRenderingContext2D) => {
      splattersRef.current = splattersRef.current.filter(splatter => {
        const age = timeRef.current - splatter.time
        if (age > 2) return false // Remove old splatters

        const fadeStart = 1
        if (age > fadeStart) {
          splatter.opacity = 0.8 * (1 - (age - fadeStart))
        }

        ctx.beginPath()
        ctx.fillStyle = `rgba(139, 0, 0, ${splatter.opacity})`
        ctx.arc(splatter.x, splatter.y, splatter.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add drip effect
        ctx.beginPath()
        ctx.fillStyle = `rgba(139, 0, 0, ${splatter.opacity * 0.7})`
        const dripLength = 10 + Math.random() * 20
        ctx.ellipse(
          splatter.x,
          splatter.y + dripLength,
          splatter.radius / 2,
          dripLength,
          0,
          0,
          Math.PI * 2
        )
        ctx.fill()

        return true
      })
    }

    const animate = () => {
      if (!canvas || !ctx) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawSorrowfulLight(ctx)
      
      // Draw the golden dome higher in the page
      drawDome(ctx, canvas.width / 2, canvas.height * 0.3) // Changed from 0.4 to 0.3
      
      drawChains(ctx)
      drawSplatters(ctx)

      if (textGlowIntensityRef.current > 0) {
        textGlowIntensityRef.current -= 0.01
      }

      timeRef.current += 0.01
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    const handleClick = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      const x = event.clientX - rect.left
      const y = event.clientY - rect.top

      chainsRef.current.forEach((chain, index) => {
        const chainX = chain.startX
        const chainY = canvas.height * 0.6 // Changed from 0.2 to 0.6
        
        if (Math.abs(x - chainX) < 30 && y > chainY && y < chainY + 225) {
          chain.isWhipping = false;
          chain.swingVelocity += (x > chainX ? 0.1 : -0.1)
          createSplatters(x, y)
        }
      })
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('click', handleClick)
    animate()

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full opacity-90 cursor-pointer"
        style={{ background: 'linear-gradient(to bottom, #000000, #1a0000)' }}
      />
      <div 
        className="fixed bottom-4 left-1/2 -translate-x-1/2 text-center transition-all duration-300"
        style={{
          textShadow: `0 0 ${10 + textGlowIntensityRef.current * 20}px rgba(139, 0, 0, ${0.5 + textGlowIntensityRef.current * 0.5})`
        }}
      >
        <p className="text-gray-400 text-sm">
          In remembrance of the martyrdom at Karbala
        </p>
      </div>
    </div>
  )
} 