"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Eye, ChevronLeft, Video, ArrowLeft } from "lucide-react" // Added ArrowLeft icon

// Define types for the round and team data
interface Team {
  id: string
  team_id: string
  institution_name: string
  team_representative_name: string
  speaker_1_name: string
  speaker_1_course_type: string
  speaker_2_name: string
  speaker_2_course_type: string
  researcher_name: string
}

interface Round {
  id: string
  round_name: string
  status: "Upcoming" | "Ongoing" | "Completed"
  date: string
  time: string
  round_type: "online" | "offline"
  venue?: string
  meet_url?: string
  judge: string
  team1: Team
  team2: Team
}

interface UseJudgeRoundsResult {
  rounds: Round[]
  isLoading: boolean
  error: Error | null
}

// Dummy data for judge rounds
const dummyJudgeRounds: Round[] = [
  {
    id: "judge-round-1",
    round_name: "Preliminary Round 1",
    status: "Upcoming",
    date: "2025-08-10",
    time: "10:00 AM",
    round_type: "online",
    meet_url: "https://meet.google.com/abc-defg-hij",
    judge: "Justice Elena Kagan",
    team1: {
      id: "team-A",
      team_id: "Team A",
      institution_name: "University of Law",
      team_representative_name: "Alice Smith",
      speaker_1_name: "Bob Johnson",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Charlie Brown",
      speaker_2_course_type: "LLM",
      researcher_name: "Diana Prince",
    },
    team2: {
      id: "team-B",
      team_id: "Team B",
      institution_name: "National Law School",
      team_representative_name: "Eve Adams",
      speaker_1_name: "Frank White",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Grace Lee",
      speaker_2_course_type: "LLM",
      researcher_name: "Harry Potter",
    },
  },
  {
    id: "judge-round-2",
    round_name: "Preliminary Round 2",
    status: "Ongoing",
    date: "2025-08-10",
    time: "02:00 PM",
    round_type: "offline",
    venue: "Courtroom 3, Main Building",
    judge: "Justice Elena Kagan",
    team1: {
      id: "team-C",
      team_id: "Team C",
      institution_name: "City Law College",
      team_representative_name: "Ivy Green",
      speaker_1_name: "Jack Black",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Karen Blue",
      speaker_2_course_type: "LLM",
      researcher_name: "Liam Red",
    },
    team2: {
      id: "team-D",
      team_id: "Team D",
      institution_name: "State University Law",
      team_representative_name: "Mia Purple",
      speaker_1_name: "Noah Yellow",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Olivia Orange",
      speaker_2_course_type: "LLM",
      researcher_name: "Peter Pink",
    },
  },
  {
    id: "judge-round-3",
    round_name: "Semi-Final Round",
    status: "Completed",
    date: "2025-08-12",
    time: "09:30 AM",
    round_type: "online",
    meet_url: "https://meet.google.com/xyz-uvw-rst",
    judge: "Justice Elena Kagan",
    team1: {
      id: "team-E",
      team_id: "Team E",
      institution_name: "Global Law Institute",
      team_representative_name: "Quinn White",
      speaker_1_name: "Rachel Black",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Sam Grey",
      speaker_2_course_type: "LLM",
      researcher_name: "Tina Brown",
    },
    team2: {
      id: "team-F",
      team_id: "Team F",
      institution_name: "International Law Academy",
      team_representative_name: "Uma Green",
      speaker_1_name: "Victor Blue",
      speaker_1_course_type: "LLB",
      speaker_2_name: "Wendy Red",
      speaker_2_course_type: "LLM",
      researcher_name: "Xavier Yellow",
    },
  },
]

// useJudgeRounds hook
const useJudgeRounds = (): UseJudgeRoundsResult => {
  const [rounds, setRounds] = useState<Round[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchRounds = async () => {
      setIsLoading(true)
      setError(null)
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        setRounds(dummyJudgeRounds)
      } catch (err) {
        setError(err as Error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRounds()
  }, [])

  return { rounds, isLoading, error }
}

const JudgeRound = () => {
  const { rounds, isLoading, error } = useJudgeRounds()
  const [selectedRound, setSelectedRound] = useState(null)

  const handleGoBackToDashboard = () => {
    window.location.href = "/juri-dashboard" // Navigate to /dashboard
  }

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>Loading allocated rounds...</p>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error.message}</div>
  }

  if (!rounds || rounds.length === 0) {
    return <div className="text-gray-500 p-6">No allocated rounds found.</div>
  }

  const handleViewDetails = (round) => {
    setSelectedRound(round)
  }

  const handleCloseDetails = () => {
    setSelectedRound(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f8faf7] to-[#e8efe5] py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Back button to dashboard */}
        <div className="mb-6 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-600 hover:text-gray-900"
            onClick={handleGoBackToDashboard}
          >
            <ArrowLeft className="h-6 w-6" />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
        </div>

        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCloseDetails}
            className={`flex items-center gap-2 text-[#2d4817] hover:text-[#233a12] font-medium transition-colors duration-200 mb-4 ${
              !selectedRound && "invisible"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Back to all allocated rounds
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Allocated Rounds</h1>
          <p className="text-gray-600 mt-2">Details of the moot court rounds you are assigned to judge.</p>
        </div>

        {/* Main Content */}
        {!selectedRound ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rounds.map((round, idx) => (
              <Card
                key={round.id || idx}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Round Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{round.round_name}</h2>
                      <Badge
                        variant="outline"
                        className={`mt-2 ${
                          round.status === "Upcoming"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : round.status === "Ongoing"
                              ? "bg-orange-50 text-orange-700 border-orange-200"
                              : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        {round.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Round {idx + 1}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-[#2d4817]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date & Time</p>
                          <p className="text-gray-900">
                            {round.date} • {round.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                          {round.round_type === "online" ? (
                            <Video className="h-5 w-5 text-[#2d4817]" />
                          ) : (
                            <MapPin className="h-5 w-5 text-[#2d4817]" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            {round.round_type === "online" ? "Meet Link" : "Venue"}
                          </p>
                          {round.round_type === "online" ? (
                            <a
                              href={round.meet_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Join Meet
                            </a>
                          ) : (
                            <p className="text-gray-900">{round.venue}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Teams Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Teams</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{round.team1?.team_id}</p>
                          <p className="text-xs text-gray-500 mt-1">{round.team1?.institution_name}</p>
                        </div>
                        <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">VS</div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{round.team2?.team_id}</p>
                          <p className="text-xs text-gray-500 mt-1">{round.team2?.institution_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(round)}
                    className="w-full bg-[#2d4817] hover:bg-[#233a12] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Eye className="h-4 w-4" />
                    View Full Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Detailed View */}
            <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300 ease-out">
              <CardContent className="p-0">
                {/* Round Header */}
                <div className="bg-[#2d4817] text-white p-6">
                  <h2 className="text-2xl font-bold mb-1">{selectedRound.round_name}</h2>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={
                        selectedRound.status === "Upcoming"
                          ? "bg-blue-100/20 text-blue-100 border-blue-100/30"
                          : selectedRound.status === "Ongoing"
                            ? "bg-orange-100/20 text-orange-100 border-orange-100/30"
                            : "bg-green-100/20 text-green-100 border-green-100/30"
                      }
                    >
                      {selectedRound.status}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {selectedRound.date} • {selectedRound.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-white/90">
                      {selectedRound.round_type === "online" ? (
                        <Video className="h-4 w-4" />
                      ) : (
                        <MapPin className="h-4 w-4" />
                      )}
                      <span>
                        {selectedRound.round_type === "online" ? (
                          <a
                            href={selectedRound.meet_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            Join Meet
                          </a>
                        ) : (
                          selectedRound.venue
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* VS Battle Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Team 1 - Left Side */}
                  <div className="p-8 bg-white">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedRound.team1?.team_id}</h3>
                      <p className="text-sm text-gray-500">{selectedRound.team1?.institution_name}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Representative</p>
                        <p className="text-gray-900 font-medium">{selectedRound.team1?.team_representative_name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 1</p>
                        <p className="text-gray-900">
                          {selectedRound.team1?.speaker_1_name}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_1_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team1?.speaker_2_name}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_2_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</p>
                        <p className="text-gray-900">{selectedRound.team1?.researcher_name}</p>
                      </div>
                    </div>
                  </div>

                  {/* VS Center - Adjusted for better spacing */}
                  <div className="bg-gray-50 flex items-center justify-center p-4 border-y border-gray-200 md:border-y-0 md:border-x">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#2d4817] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        VS
                      </div>
                      <div className="text-center text-sm text-gray-500">
                        <p>Judge:</p>
                        <p className="font-medium text-gray-900">{selectedRound.judge}</p>
                      </div>
                    </div>
                  </div>

                  {/* Team 2 - Right Side */}
                  <div className="p-8 bg-white">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">{selectedRound.team2?.team_id}</h3>
                      <p className="text-sm text-gray-500">{selectedRound.team2?.institution_name}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Representative</p>
                        <p className="text-gray-900 font-medium">{selectedRound.team2?.team_representative_name}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 1</p>
                        <p className="text-gray-900">
                          {selectedRound.team2?.speaker_1_name}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_1_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team2?.speaker_2_name}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_2_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</p>
                        <p className="text-gray-900">{selectedRound.team2?.researcher_name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default JudgeRound
