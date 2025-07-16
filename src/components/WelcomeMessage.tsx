"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Users, School } from "lucide-react"

interface WelcomeMessageProps {
  teamData: {
    teamCode: string
    teamName: string
    university: string
    participants: string[]
  }
}

const WelcomeMessage = ({ teamData }: WelcomeMessageProps) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <Card
      className={`bg-gradient-to-r from-green-900 to-green-900 text-white border-0 transition-all duration-1000 ${
        isVisible ? "transform translate-y-0 opacity-100" : "transform translate-y-4 opacity-0"
      }`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <Trophy className="h-6 w-6" />
              <h2 className="text-2xl font-bold">Welcome back!</h2>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-white/80">Team:</span>
                <span className="font-semibold text-green-200 text-lg animate-pulse">{teamData.teamCode}</span>
                <span className="text-white">({teamData.teamName})</span>
              </div>

              <div className="flex items-center gap-2">
                <School className="h-4 w-4 text-white/80" />
                <span className="text-white/90">{teamData.university}</span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-white/80" />
                <span className="text-white/90">{teamData.participants.length} participants</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-white/90 text-sm mb-1">Competition starts in</p>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3">
              <p className="text-2xl font-bold text-white-800">7 Days</p>
              <p className="text-xs text-white/80">Get ready!</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default WelcomeMessage
