"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"

// Interface for TeamCard props
interface TeamCardProps {
  teamCode: string
  teamName: string
  university: string
  representative: string
  speaker1: string
  speaker2: string
  researcher: string
}

// TeamCard Component
function TeamCard({ teamCode, teamName, university, representative, speaker1, speaker2, researcher }: TeamCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Helper function to get initial for avatar
  const getInitial = (name: string) => name.charAt(0).toUpperCase()

  // Combine members into an array for easier mapping
  const teamMembers = [
    { name: representative, role: "Representative" },
    { name: speaker1, role: "Speaker 1" },
    { name: speaker2, role: "Speaker 2" },
    { name: researcher, role: "Researcher" },
  ]

  const handleCardClick = () => {
    setIsExpanded((prev) => !prev)
  }

  return (
    <Card
      className={`shadow-sm cursor-pointer transition-all duration-300 ${
        isExpanded ? "ring-2 ring-[#2d4817] shadow-lg" : "hover:shadow-md"
      } border-2 border-[#4CAF50] rounded-lg`}
      onClick={handleCardClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
          <Users className="h-6 w-6 text-[#2d4817]" />
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-gray-50">
          {teamCode} ({teamName})
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          {isExpanded ? "Click to hide details" : "Click to view details"}
        </p>

        {isExpanded && (
          <div className="mt-4 w-full border-t pt-4 space-y-3">
            <div className="text-left">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">University</p>
              <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{university}</p>
            </div>
            <div className="text-left">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Team Members</p>
              <div className="grid grid-cols-2 gap-2">
                {teamMembers.map((member, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Avatar className="w-6 h-6 bg-[#2d4817] text-white font-semibold text-xs">
                      <AvatarFallback>{getInitial(member.name)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-gray-600 dark:text-gray-100">{member.name}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-2">
             <Button
                onClick={(e) => {
                  e.stopPropagation()
                  // Navigate to marks page using window.location.href
                  window.location.href = `/juri-dashboard/marks?teamCode=${teamCode}`
                }}
                className="bg-green-900 hover:bg-green-800 text-white"
              >
                Marks
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  // Add functionality for Memorial button
                  window.location.href = `/juri-dashboard/memorial?teamCode=${teamCode}`
                }}
                className="bg-green-900 hover:bg-green-800 text-white"
              >
                Memorial
              </Button>
              <Button
                onClick={(e) => {
                  e.stopPropagation()
                  // Add functionality for Rounds button
                  console.log("Rounds button clicked for", teamCode)
                }}
                className="bg-green-900 hover:bg-green-800 text-white"
              >
                Rounds
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Type for team data
type TeamData = {
  teamCode: string
  teamName: string
  university: string
  representative: string
  speaker1: string
  speaker2: string
  researcher: string
}

// Sample team data
const teams: TeamData[] = [
  {
    teamCode: "T001",
    teamName: "Legal Eagles",
    university: "National Law University, Delhi",
    representative: "Aisha Khan",
    speaker1: "Rahul Sharma",
    speaker2: "Priya Singh",
    researcher: "Vikram Reddy",
  },
  {
    teamCode: "T002",
    teamName: "Justice Seekers",
    university: "Symbiosis Law School, Pune",
    representative: "Siddharth Gupta",
    speaker1: "Ananya Rao",
    speaker2: "Karan Malhotra",
    researcher: "Deepika Kumari",
  },
  {
    teamCode: "T003",
    teamName: "Veritas Squad",
    university: "Gujarat National Law University",
    representative: "Neha Patel",
    speaker1: "Arjun Desai",
    speaker2: "Rhea Kapoor",
    researcher: "Sameer Joshi",
  },
  {
    teamCode: "T004",
    teamName: "The Advocates",
    university: "NALSAR University of Law, Hyderabad",
    representative: "Ishaan Verma",
    speaker1: "Meera Choudhary",
    speaker2: "Rohan Singh",
    researcher: "Sara Ali",
  },
  {
    teamCode: "T005",
    teamName: "Lex Crusaders",
    university: "Amity Law School, Noida",
    representative: "Divya Sharma",
    speaker1: "Akash Kumar",
    speaker2: "Shruti Gupta",
    researcher: "Vivek Singh",
  },
]

// Main Team Component
const Team = () => {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
        Participating Teams
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {teams.map((team) => (
          <TeamCard
            key={team.teamCode}
            teamCode={team.teamCode}
            teamName={team.teamName}
            university={team.university}
            representative={team.representative}
            speaker1={team.speaker1}
            speaker2={team.speaker2}
            researcher={team.researcher}
          />
        ))}
      </section>
    </main>
  )
}

export default Team
