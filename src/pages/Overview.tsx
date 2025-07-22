"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, School, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import OverviewSkeleton from "./OverviewSkeleton"

interface Participant {
  name: string
}

interface TeamDetails {
  team_code: string
  team_name: string
  university: string
  participants: Participant[]
}

interface CompetitionProgress {
  total_teams: number
  qualified_for_round_2: number
  rounds_completed: number
}

interface UpcomingDeadline {
  title: string
  deadline: string
}

interface OverviewData {
  team_details: TeamDetails
  competition_progress: CompetitionProgress
  upcoming_deadline: UpcomingDeadline
}

interface OverviewProps {
  overviewData: OverviewData | null
}

const Overview = ({ overviewData }: OverviewProps) => {
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const registrationEndDate = new Date("2025-08-15T00:00:00")

  const calculateTimeLeft = () => {
    const now = new Date()
    const difference = registrationEndDate.getTime() - now.getTime()

    let newTimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

    if (difference > 0) {
      newTimeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }
    setTimeLeft(newTimeLeft)
  }

  useEffect(() => {
    calculateTimeLeft()

    const timer = setInterval(() => {
      calculateTimeLeft()
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (overviewData?.upcoming_deadline?.deadline) {
      const deadlineDate = new Date(overviewData.upcoming_deadline.deadline)
      const now = new Date()
      const diffTime = deadlineDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilDeadline(diffDays)
    }
  }, [overviewData])

  if (!overviewData) {
    return <OverviewSkeleton />
  }

  const { team_details, competition_progress, upcoming_deadline } = overviewData

  return (
    <div className="space-y-6 p-4 md:p-6">
      <Card className="bg-[#2d4817] text-white border-0 shadow-lg">
        <CardContent className="p-6">
          {/* Top row: Welcome Back! and Registration Countdown */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-green-100 mb-6">
                Welcome to your JuristQuest 2025 Participant Dashboard. Track your team’s progress, view important deadlines, and stay updated throughout the competition.
              </p>
            </div>

            {/* Registration Ends In Block */}
            <div className="bg-white text-gray-900 border border-[#2d4817] rounded-lg p-4 text-center flex-shrink-0 w-full md:w-auto">
              <p className="text-sm text-gray-900 mb-1">Competition starts in</p>
              <div className="bg-[#2d4817] text-white rounded-md p-2 mb-2 inline-block min-w-[80px]">
                <div className="text-4xl font-bold flex justify-center gap-2">
                  <span>{timeLeft.days.toString().padStart(2, "0")}D</span>
                  <span>{timeLeft.hours.toString().padStart(2, "0")}H</span>
                  <span>{timeLeft.minutes.toString().padStart(2, "0")}M</span>
                  <span>{timeLeft.seconds.toString().padStart(2, "0")}S</span>
                </div>
              </div>
              <p className="text-sm text-gray-900">at 16 August 2025</p>
            </div>
          </div>

          {/* Second row: Your Competition Progress cards */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 text-white">Your Competition Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#2d4817] rounded flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Total Teams</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[80%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.total_teams} Teams</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#2d4817] rounded flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Qualified for Round 2</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[50%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.qualified_for_round_2} Teams</div>
                </div>
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-[#2d4817] rounded flex items-center justify-center">
                    <Users className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">Rounds Completed</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[75%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.rounds_completed} Rounds</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-800">Upcoming Deadline</h3>
              <p className="text-sm text-red-600">
                {upcoming_deadline.title} submission deadline is in {daysUntilDeadline} days (
                {new Date(upcoming_deadline.deadline).toLocaleDateString()})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <Users className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">Team</h3>
            <p className="text-sm text-gray-600">
              {team_details.team_code} ({team_details.team_name})
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <School className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">University</h3>
            <p className="text-sm text-gray-600">{team_details.university}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Team Members</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {team_details.participants.map((participant, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-[#2d4817] text-white flex items-center justify-center text-xl font-semibold border-2 border-[#2d4817] mb-2">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-xs text-gray-600">{participant.name}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Overview
