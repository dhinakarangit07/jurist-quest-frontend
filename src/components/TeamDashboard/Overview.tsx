"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Users, School, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import OverviewSkeleton from "@/components/skeleton/TeamDashboard/OverviewSkeleton"

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
  total_rounds: number
  upcoming_rounds: number
  ongoing_rounds: number
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
      {/* Welcome Card */}
      <Card className="bg-[#2d4817] text-white border-0 shadow-lg">
        <CardContent className="p-4 md:p-6">
          {/* Top Section - Responsive Layout */}
          <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Welcome Back!</h1>
              <p className="text-green-100 text-sm md:text-base mb-4">
                Welcome to your JuristQuest 2025 Participant Dashboard. Track your team’s progress, view important deadlines, and stay updated throughout the competition.
              </p>
            </div>

            {/* Countdown Timer - Responsive Styling */}
            <div className="bg-white text-gray-900 border border-[#2d4817] rounded-lg p-3 md:p-4 text-center w-full md:w-auto">
              <p className="text-xs md:text-sm text-gray-900 mb-1">Competition starts in</p>
              <div className="bg-[#2d4817] text-white rounded-md p-2 mb-2 inline-block min-w-[120px] md:min-w-[160px]">
                <div className="text-2xl md:text-4xl font-bold flex flex-wrap justify-center gap-1 md:gap-2">
                  <span className="text-xs md:text-base md:font-normal block w-full md:hidden">Time Left:</span>
                  <span>{timeLeft.days.toString().padStart(2, "0")}D</span>
                  <span>{timeLeft.hours.toString().padStart(2, "0")}H</span>
                  <span>{timeLeft.minutes.toString().padStart(2, "0")}M</span>
                  <span>{timeLeft.seconds.toString().padStart(2, "0")}S</span>
                </div>
              </div>
              <p className="text-xs md:text-sm text-gray-900">at 16 August 2025</p>
            </div>
          </div>

          {/* Progress Cards - Responsive Grid */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-3 text-white">Your Competition Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
              {/* Total Rounds Card */}
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d4817] rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm md:text-lg font-bold text-gray-900">Total Rounds</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[80%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.total_rounds} Rounds</div>
                </div>
              </div>

              {/* Upcoming Rounds Card */}
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d4817] rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm md:text-lg font-bold text-gray-900">Upcoming Rounds</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[50%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.upcoming_rounds} Rounds</div>
                </div>
              </div>

              {/* Ongoing Rounds Card */}
              <div className="bg-white rounded-lg p-3 md:p-4 border border-gray-200">
                <div className="flex items-center gap-2 md:gap-3 mb-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-[#2d4817] rounded flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <div className="text-sm md:text-lg font-bold text-gray-900">Ongoing Rounds</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="h-1.5 md:h-2 w-full bg-gray-200 rounded-full">
                    <div className="h-full w-[75%] bg-[#2d4817] rounded-full"></div>
                  </div>
                  <div className="text-xs text-gray-500">{competition_progress.ongoing_rounds} Rounds</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadline Alert - Responsive */}
      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardContent className="p-3 md:p-4">
          <div className="flex items-start gap-2 md:gap-3">
            <AlertCircle className="h-4 w-4 md:h-5 md:w-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-800 text-sm md:text-base">Upcoming Deadline</h3>
              <p className="text-xs md:text-sm text-red-600">
                {upcoming_deadline.title} submission deadline is in {daysUntilDeadline} days (
                {new Date(upcoming_deadline.deadline).toLocaleDateString()})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Info Cards - Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Team Card */}
        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-2 md:mb-3">
              <Users className="h-5 w-5 md:h-6 md:w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">Team</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">
              {team_details.team_code} ({team_details.team_name})
            </p>
          </CardContent>
        </Card>

        {/* University Card */}
        <Card className="shadow-sm">
          <CardContent className="p-4 md:p-6 flex flex-col items-center text-center">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-2 md:mb-3">
              <School className="h-5 w-5 md:h-6 md:w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base">University</h3>
            <p className="text-xs md:text-sm text-gray-600 mt-1">{team_details.university}</p>
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="shadow-sm md:col-span-2 lg:col-span-1">
          <CardContent className="p-4 md:p-6">
            <h3 className="font-semibold text-gray-900 mb-3 md:mb-4 text-center text-sm md:text-base">Team Members</h3>
            <div className="flex justify-center gap-3 md:gap-4 flex-wrap">
              {team_details.participants.map((participant, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2d4817] text-white flex items-center justify-center text-lg md:text-xl font-semibold border-2 border-[#2d4817] mb-1 md:mb-2">
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-xs text-gray-600 max-w-[70px] md:max-w-none truncate">{participant.name}</p>
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
