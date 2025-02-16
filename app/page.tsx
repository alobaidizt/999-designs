"use client"

import { Coffee, MapPin, Clock } from "lucide-react"
import type React from "react"

import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Page() {
  return null
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow transform hover:-translate-y-1 animate-float-card">
      <div className="mx-auto w-16 h-16 mb-4 text-amber-700">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-amber-900">{title}</h3>
      <p className="text-amber-700">{description}</p>
    </div>
  )
}

interface SpecialtyCardProps {
  title: string
  description: string
}

function SpecialtyCard({ title, description }: SpecialtyCardProps) {
  return (
    <div className="bg-amber-100 rounded-lg p-6 hover:bg-amber-200 transition-colors transform hover:-translate-y-1 animate-float-card">
      <h3 className="text-2xl font-bold mb-2 text-amber-900">{title}</h3>
      <p className="text-amber-700">{description}</p>
    </div>
  )
}

