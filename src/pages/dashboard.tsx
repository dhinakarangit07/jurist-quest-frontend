"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

import { Users, Trophy, Calendar, AlertTriangle } from "lucide-react"

import { AppSidebar } from "@/pages/app-sidebar"
import { Header } from "@/pages/header"

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

interface TeamData {
  teamCode: string
  teamName: string
  university: string
  participants: { name: string; avatarUrl?: string }[]
}

interface DashboardProps {
  teamData: TeamData
  onLogout: () => void
}

const DashboardContent = ({ teamData, onLogout }: DashboardProps) => {
  // Mock current date for consistent calculation.
  const today = new Date("2025-07-17T09:00:00")
  const competitionDate = new Date("2025-07-24T09:00:00") // Example: 7 days from today
  const diffTime = competitionDate.getTime() - today.getTime()
  const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  const competitionProgress = [
    {
      title: "Total Teams",
      value: 32,
      total: 50,
      icon: Users,
      description: "32 Teams",
    },
    {
      title: "Qualified for Round 2",
      value: 16,
      total: 32,
      icon: Trophy,
      description: "16 Rounds",
    },
    {
      title: "Rounds Completed",
      value: 2,
      total: 5,
      icon: Calendar,
      description: "2 Rounds",
    },
  ]

  return (
    <div className="flex flex-col flex-1">
      <main className="flex-1 overflow-auto p-6 space-y-6">
        <Card className="bg-blue-500 text-white p-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-400 opacity-90"></div>
          <div className="relative z-10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex-1">
              <h2 className="text-4xl font-bold mb-2">Welcome Back!</h2>
              <p className="text-blue-100 text-lg max-w-2xl">
                Utilize this space to add some description here or more information about the competition or welcome
                description.
              </p>
            </div>
            <Card className="bg-white text-blue-800 p-4 rounded-lg flex flex-col items-center justify-center text-center shadow-md min-w-[160px]">
              <CardTitle className="text-sm font-semibold mb-2">Competition starts in</CardTitle>
              <div className="text-5xl font-bold text-green-600 leading-none">{daysRemaining}</div>
              <div className="text-sm font-semibold text-gray-700 mt-1">DAYS</div>
            </Card>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {competitionProgress.map((item, index) => (
            <Card key={index} className="p-4 flex flex-col items-start">
              <CardHeader className="p-0 pb-2">
                <div className="p-2 bg-blue-100 rounded-lg mb-2">
                  <item.icon className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-semibold">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="p-0 w-full">
                <Progress value={(item.value / item.total) * 100} className="h-2 bg-gray-200 [&>*]:bg-blue-500" />
                <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Alert className="border-red-200 bg-red-50 text-red-800">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Upcoming Deadline</AlertTitle>
          <AlertDescription className="text-red-700">
            Memorial submission deadline is in 2 days (Dec 8, 11:59 PM)
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-4 flex flex-col items-start">
            <CardHeader className="p-0 pb-2">
              <div className="p-2 bg-blue-100 rounded-lg mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold">Team</CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full">
              <p className="text-sm text-gray-600">
                {teamData.teamCode} ({teamData.teamName})
              </p>
            </CardContent>
          </Card>
          <Card className="p-4 flex flex-col items-start">
            <CardHeader className="p-0 pb-2">
              <div className="p-2 bg-blue-100 rounded-lg mb-2">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold">University</CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full">
              <p className="text-sm text-gray-600">{teamData.university}</p>
            </CardContent>
          </Card>
          <Card className="p-4 flex flex-col items-start">
            <CardHeader className="p-0 pb-2">
              <div className="p-2 bg-blue-100 rounded-lg mb-2">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
            </CardHeader>
            <CardContent className="p-0 w-full flex flex-wrap gap-4 justify-center sm:justify-start">
              {teamData.participants.map((participant, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <Avatar className="h-12 w-12 border-2 border-white mb-1">
                    <AvatarImage
                      src={participant.avatarUrl || `/placeholder.svg?height=48&width=48`}
                      alt={participant.name || "Participant"}
                    />
                    <AvatarFallback>
                      {(participant.name || "")
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <p className="text-sm text-gray-700 font-medium">{participant.name}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

export default function DashboardPage() {
  // In a pure React app, you would manage the current path using a client-side router
  // For this example, we'll use a default path.
  const currentPath = "/"

  const teamData = {
    teamCode: "ABC123",
    teamName: "Legal Eagles",
    university: "University of Excellence",
    participants: [
      { name: "John Doe", avatarUrl: "/placeholder.svg?height=32&width=32" },
      { name: "Jane Smith", avatarUrl: "/placeholder.svg?height=32&width=32" },
      { name: "Mike Taylor", avatarUrl: "/placeholder.svg?height=32&width=32" },
    ],
  }

  const handleLogout = () => {
    console.log("User logged out!")
  }

  return (
    <SidebarProvider>
      <AppSidebar currentPath={currentPath} onLogout={handleLogout} />
      <SidebarInset className="bg-gray-50">
        <Header />
        <DashboardContent teamData={teamData} onLogout={handleLogout} />
      </SidebarInset>
    </SidebarProvider>
  )
}
