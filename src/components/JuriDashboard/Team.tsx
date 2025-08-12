"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import useJuryTeams from "@/hooks/useJuryTeams"
import TeamCardSkeleton from "@/components/skeleton/TeamDashboard/TeamCardSkeleton"

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
  // Helper function to get initial for avatar
  const getInitial = (name: string) => name.charAt(0).toUpperCase()

  // Combine members into an array for easier mapping
  const teamMembers = [
    { name: representative, role: "Representative" },
    { name: speaker1, role: "Speaker 1" },
    { name: speaker2, role: "Speaker 2" },
    { name: researcher, role: "Researcher" },
  ]

  return (
    <Card
      className="shadow-sm hover:shadow-md transition-all duration-300 border-2 border-[#4CAF50] rounded-lg"
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
          <Users className="h-6 w-6 text-[#2d4817]" />
        </div>

        <p className="text-sm font-medium text-gray-900 dark:text-gray-50 mb-2">
          {teamCode} ({teamName})
        </p>

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
                window.location.href = `/juri-dashboard/round?teamCode=${teamCode}`
              }}
              className="bg-green-900 hover:bg-green-800 text-white"
            >
              Rounds
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Main Team Component
const Team = () => {
  const { juryTeams, isLoading, error } = useJuryTeams();

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Your Teams
        </h1>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
          <TeamCardSkeleton />
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Your Teams
        </h1>
        <div className="text-center py-8 text-red-500">
          <p>{error.message}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
        Your Teams
      </h1>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
        {juryTeams.map((team) => (
          <TeamCard
            key={team.team_id}
            teamCode={team.team_id}
            teamName={team.team_representative_name}
            university={team.institution_name}
            representative={team.team_representative_name}
            speaker1={team.speaker_1_name}
            speaker2={team.speaker_2_name}
            researcher={team.researcher_name}
          />
        ))}
      </section>
    </main>
  )
}

export default Team
