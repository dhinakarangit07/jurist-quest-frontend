"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Info, Users, Swords } from "lucide-react"
import { Button } from "@/components/ui/button"
import useJuryTeams from "@/hooks/useJuryTeams"
import TeamCardSkeleton from "@/components/skeleton/TeamDashboard/TeamCardSkeleton"
import { useEffect, useState } from "react"
import axios from "axios"

// Interface for TeamCard props
interface TeamCardProps {
  teamCode: string
  teamName: string
  university: string
  representative: string
  speaker1: string
  speaker2: string
  researcher: string
  opponent?: {
    team_id: string
    team_representative_name: string
    roundName: string
  }
}

// TeamCard Component
function TeamCard({ teamCode, teamName, university, representative, speaker1, speaker2, researcher, opponent }: TeamCardProps) {
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

          {opponent && (
            <div className="mt-4 pt-4 border-t border-dashed text-left">
                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 mb-1">
                    <Swords className="h-4 w-4" />
                    <span>Opponent in {opponent.roundName}</span>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-gray-50">{opponent.team_representative_name} ({opponent.team_id})</p>
            </div>
          )}

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
  const [rounds, setRounds] = useState([]);
  const [isLoadingRounds, setIsLoadingRounds] = useState(true);

  useEffect(() => {
    if (juryTeams && juryTeams.length > 0) {
        setIsLoadingRounds(true);
        const accessToken = localStorage.getItem("access_token");
        const apiUrl = import.meta.env.VITE_API_URL;

        Promise.all(juryTeams.map(team =>
            axios.get(`${apiUrl}/api/jury-rounds/${team.team_id}/`, {
                headers: { "Authorization": `Bearer ${accessToken}` }
            })
        )).then(responses => {
            const allRoundsRaw = responses.flatMap(res => res.data);
            const uniqueRounds = Array.from(new Map(allRoundsRaw.map(r => [r.id, r])).values());
            setRounds(uniqueRounds);
        }).catch(err => {
            console.error("Failed to fetch rounds for all teams", err);
        }).finally(() => {
            setIsLoadingRounds(false);
        });
    } else if (!isLoading) {
        setIsLoadingRounds(false);
    }
  }, [juryTeams, isLoading]);

  const pairings = {};
  for (const round of rounds) {
      if (round.team1 && round.team2) {
          pairings[round.team1.team_id] = { 
              team_id: round.team2.team_id,
              team_representative_name: round.team2.team_representative_name,
              roundName: round.round_name 
          };
          pairings[round.team2.team_id] = {
              team_id: round.team1.team_id,
              team_representative_name: round.team1.team_representative_name,
              roundName: round.round_name
          };
      }
  }

  if (isLoading || isLoadingRounds) {
    return (
      <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
          Current Teams
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
          Current Teams
        </h1>
        <div className="text-center py-8 text-red-500">
          <p>{error.message}</p>
        </div>
      </main>
    );
  }

  if (juryTeams.length === 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="h-8 w-8 text-gray-500 dark:text-gray-400" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">No Teams Assigned</h2>
          <p className="text-gray-600 dark:text-gray-400">
            You don&apos;t have any teams to judge at the moment.
          </p>
          <p className="text-gray-600 dark:text-gray-400">
            Once rounds have started, team details will be available here.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-900 dark:text-gray-50">
        Current Teams
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
            opponent={pairings[team.team_id]}
          />
        ))}
      </section>
    </main>
  )
}

export default Team