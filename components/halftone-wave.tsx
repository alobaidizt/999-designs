"use client"

import { useEffect, useRef, useState } from 'react'

export default function HalftoneWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [freqX, setFreqX] = useState(3)
  const [freqY, setFreqY] = useState(2)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const drawHelix = () => {
      const numLines = 50
      const points = []
      
      // Generate points for the helix
      for (let i = 0; i < numLines; i++) {
        const t = (i / numLines) * Math.PI * 2
        const radius = Math.min(canvas.width, canvas.height) * 0.3
        
        // Use freqX and freqY from state
        const x = canvas.width / 2 + Math.cos(t * freqX + time) * radius
        const y = canvas.height / 2 + Math.sin(t * freqY + time) * radius * 0.5
        
        // Add wave displacement
        const wave = Math.sin(t * 3 + time * 2) * 20
        points.push({ x: x + wave, y })
      }

      // Draw connected lines
      ctx.beginPath()
      ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)' // Golden color
      ctx.lineWidth = 2

      // Connect the points
      points.forEach((point, index) => {
        if (index === 0) {
          ctx.moveTo(point.x, point.y)
        } else {
          // Create smooth curves between points
          const xc = (points[index - 1].x + point.x) / 2
          const yc = (points[index - 1].y + point.y) / 2
          ctx.quadraticCurveTo(points[index - 1].x, points[index - 1].y, xc, yc)
        }
      })
      
      ctx.stroke()
    }

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      drawHelix()

      time += 0.01
      animationFrameId = requestAnimationFrame(animate)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [freqX, freqY])

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* Controls */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-sm px-4 z-20">
        <div className="bg-black/30 backdrop-blur-lg rounded-lg shadow-xl p-6 space-y-4 border border-white/10">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Frequency X: {freqX.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={freqX}
              onChange={(e) => setFreqX(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Frequency Y: {freqY.toFixed(1)}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.1"
              value={freqY}
              onChange={(e) => setFreqY(Number(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

