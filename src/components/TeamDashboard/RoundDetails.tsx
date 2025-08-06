"use client"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Eye, ChevronLeft, Video, Trophy, Clock, Target } from "lucide-react"
import useRounds from "@/hooks/useRounds"
import RoundDetailsSkeleton from "@/components/skeleton/TeamDashboard/RoundDetailsSkeleton"

const RoundDetails = () => {
  const { rounds, isLoading, error } = useRounds()
  const [teamData, setTeamData] = useState(null)
  const [selectedRound, setSelectedRound] = useState(null)

  useEffect(() => {
    const storedTeamData = localStorage.getItem("team_data")
    if (storedTeamData) {
      setTeamData(JSON.parse(storedTeamData))
    }
  }, [])

  if (isLoading) {
    return <RoundDetailsSkeleton />
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error.message}</div>
  }

  if (!rounds || rounds.length === 0) {
    return <div className="text-gray-500 p-6">No rounds found.</div>
  }

  // Find current round (ongoing status)
  const currentRound = rounds.find((round) => round.status.toLowerCase() === "ongoing") || rounds[0]

  // Count upcoming rounds
  const upcomingRounds = rounds.filter((round) => round.status.toLowerCase() === "upcoming")
  const upcomingRoundsCount = upcomingRounds.length

  // Check if current round should show full details (ongoing and within 5 minutes)
  const shouldShowCurrentRoundDetails = () => {
    if (!currentRound || currentRound.status.toLowerCase() !== "ongoing") return false

    try {
      // Parse the round date and time
      const dateTimeString = `${currentRound.date}T${currentRound.time}`
      const roundDateTime = new Date(dateTimeString)

      if (isNaN(roundDateTime.getTime())) {
        console.error("Invalid date/time format:", dateTimeString)
        return true // Show details by default if parsing fails
      }

      const now = new Date()
      const timeDifference = roundDateTime.getTime() - now.getTime()
      const minutesDifference = timeDifference / (1000 * 60)

      console.log("Round time:", roundDateTime)
      console.log("Current time:", now)
      console.log("Minutes difference:", minutesDifference)

      // Show details if start time is within 5 minutes or has passed
      return minutesDifference <= 5
    } catch (error) {
      console.error("Error parsing date/time:", error)
      return true // Show details by default if there's an error
    }
  }

  // Determine current round status
  const getCurrentRoundStatus = () => {
    if (currentRound?.status.toLowerCase() === "ongoing") return "In Progress"
    if (currentRound?.winner_team_id === teamData?.id) return "Won"
    if (currentRound?.winner_team_id && currentRound?.winner_team_id !== teamData?.id) return "Lost"
    return "In Progress"
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
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCloseDetails}
            className={`flex items-center gap-2 text-[#2d4817] hover:text-[#233a12] font-medium transition-colors duration-200 mb-4 ${
              !selectedRound && "invisible"
            }`}
          >
            <ChevronLeft className="h-5 w-5" />
            Back to overview
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Round Details</h1>
          <p className="text-gray-600 mt-2">Your current round, upcoming matches, and status overview</p>
        </div>

        {/* Main Content */}
        {!selectedRound ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Current Round Card */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                    <Target className="h-6 w-6 text-[#2d4817]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Current Round</h2>
                    <p className="text-sm text-gray-500">Active competition</p>
                  </div>
                </div>

                {currentRound && (
                  <div className="space-y-4">
                    {shouldShowCurrentRoundDetails() ? (
                      <>
                        <div className="bg-[#2d4817]/5 rounded-lg p-4">
                          <h3 className="font-semibold text-[#2d4817] mb-2">{currentRound.round_name}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {currentRound.date} • {currentRound.time}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            {currentRound.round_type === "online" ? (
                              <Video className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{currentRound.round_type === "online" ? "Online Meeting" : currentRound.venue}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <User className="h-4 w-4" />
                            <span>Judge: {currentRound.judge}</span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-gray-500 mb-3">Match-up</h4>
                          <div className="flex items-center justify-between">
                            <div className="text-center">
                              <p className="font-semibold text-gray-900">{currentRound.team1?.team_id}</p>
                              <p className="text-xs text-gray-500">{currentRound.team1?.institution_name}</p>
                            </div>
                            <div className="px-3 py-1 bg-[#2d4817] text-white rounded-full text-xs font-medium">VS</div>
                            <div className="text-center">
                              <p className="font-semibold text-gray-900">{currentRound.team2?.team_id}</p>
                              <p className="text-xs text-gray-500">{currentRound.team2?.institution_name}</p>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => handleViewDetails(currentRound)}
                          className="w-full bg-[#2d4817] hover:bg-[#233a12] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                        >
                          <Eye className="h-4 w-4" />
                          View Details
                        </button>
                      </>
                    ) : (
                      <>
                        <div className="bg-[#2d4817]/5 rounded-lg p-6 text-center">
                          <div className="w-16 h-16 rounded-full bg-[#2d4817]/10 flex items-center justify-center mx-auto mb-4">
                            <Clock className="h-8 w-8 text-[#2d4817]" />
                          </div>
                          <h3 className="font-semibold text-[#2d4817] text-lg mb-2">Coming Soon</h3>
                          <p className="text-sm text-gray-600 mb-3">{currentRound.round_name}</p>
                          <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {currentRound.date} • {currentRound.time}
                            </span>
                          </div>
                        </div>

                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <p className="text-sm text-gray-600">
                            Round details will be available 5 minutes before start time
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Rounds Count Card */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Clock className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Upcoming Rounds</h2>
                    <p className="text-sm text-gray-500">Scheduled competitions</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-blue-50 rounded-lg p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl font-bold text-blue-600">{upcomingRoundsCount}</span>
                    </div>
                    <h3 className="font-semibold text-blue-700 text-lg mb-2">
                      {upcomingRoundsCount === 0
                        ? "No Upcoming Rounds"
                        : upcomingRoundsCount === 1
                          ? "1 Round Scheduled"
                          : `${upcomingRoundsCount} Rounds Scheduled`}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {upcomingRoundsCount === 0
                        ? "All rounds completed or no future rounds scheduled"
                        : `You have ${upcomingRoundsCount} upcoming ${upcomingRoundsCount === 1 ? "round" : "rounds"} to prepare for`}
                    </p>
                  </div>

                  {upcomingRoundsCount > 0 && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Upcoming Rounds</h4>
                      <div className="space-y-3">
                        {upcomingRounds.map((round) => (
                          <div key={round.id} className="text-center border-b border-gray-200 last:border-b-0 pb-3">
                            <p className="font-semibold text-gray-900">{round.round_name}</p>
                            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 mt-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {round.date} • {round.time}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {upcomingRoundsCount > 0 ? (
                    <button
                      onClick={() => handleViewDetails(upcomingRounds[0])}
                      className="hidden w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Next Round
                    </button>
                  ) : (
                    <div className="w-full bg-gray-100 text-gray-500 font-medium py-2 px-4 rounded-lg text-center">
                      No rounds to view
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Current Round Status Card */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`p-2 rounded-lg ${
                      getCurrentRoundStatus() === "Won"
                        ? "bg-green-100"
                        : getCurrentRoundStatus() === "Lost"
                          ? "bg-red-100"
                          : "bg-orange-100"
                    }`}
                  >
                    <Trophy
                      className={`h-6 w-6 ${
                        getCurrentRoundStatus() === "Won"
                          ? "text-green-600"
                          : getCurrentRoundStatus() === "Lost"
                            ? "text-red-600"
                            : "text-orange-600"
                      }`}
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Round Status</h2>
                    <p className="text-sm text-gray-500">Current performance</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    className={`rounded-lg p-6 text-center ${
                      getCurrentRoundStatus() === "Won"
                        ? "bg-green-50 border border-green-200"
                        : getCurrentRoundStatus() === "Lost"
                          ? "bg-red-50 border border-red-200"
                          : "bg-orange-50 border border-orange-200"
                    }`}
                  >
                    <div
                      className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center ${
                        getCurrentRoundStatus() === "Won"
                          ? "bg-green-100"
                          : getCurrentRoundStatus() === "Lost"
                            ? "bg-red-100"
                            : "bg-orange-100"
                      }`}
                    >
                      <Trophy
                        className={`h-8 w-8 ${
                          getCurrentRoundStatus() === "Won"
                            ? "text-green-600"
                            : getCurrentRoundStatus() === "Lost"
                              ? "text-red-600"
                              : "text-orange-600"
                        }`}
                      />
                    </div>
                    <h3
                      className={`text-2xl font-bold mb-2 ${
                        getCurrentRoundStatus() === "Won"
                          ? "text-green-700"
                          : getCurrentRoundStatus() === "Lost"
                            ? "text-red-700"
                            : "text-orange-700"
                      }`}
                    >
                      {getCurrentRoundStatus()}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {getCurrentRoundStatus() === "Won"
                        ? "Congratulations on your victory!"
                        : getCurrentRoundStatus() === "Lost"
                          ? "Better luck in the next round!"
                          : "Round is currently in progress"}
                    </p>
                  </div>

                  {currentRound && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Round Details</h4>
                      <p className="font-semibold text-gray-900 mb-1">{currentRound.round_name}</p>
                      <p className="text-sm text-gray-600">{currentRound.date}</p>
                    </div>
                  )}

                  {/* <button
                    onClick={() => handleViewDetails(currentRound)}
                    className={`w-full font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
                      getCurrentRoundStatus() === "Won"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : getCurrentRoundStatus() === "Lost"
                          ? "bg-red-600 hover:bg-red-700 text-white"
                          : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    View Round Details
                  </button> */}
                </div>
              </CardContent>
            </Card>
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
                        selectedRound.status.toLowerCase() === "upcoming"
                          ? "bg-blue-100/20 text-blue-100 border-blue-100/30"
                          : selectedRound.status.toLowerCase() === "ongoing"
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
                  <div
                    className={`p-8 ${
                      selectedRound.team1?.id === teamData?.id
                        ? "bg-[#2d4817]/5 border-t-2 border-[#2d4817]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3
                        className={`text-xl font-bold ${
                          selectedRound.team1?.id === teamData?.id ? "text-[#2d4817]" : "text-gray-900"
                        }`}
                      >
                        {selectedRound.team1?.team_id}
                      </h3>
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

                  {/* VS Center */}
                  <div className="bg-gray-50 flex items-center justify-center p-4 border-y border-gray-200 md:border-y-0 md:border-x">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-16 h-16 rounded-full bg-[#2d4817] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        VS
                      </div>
                    </div>
                  </div>

                  {/* Team 2 - Right Side */}
                  <div
                    className={`p-8 ${
                      selectedRound.team2?.id === teamData?.id
                        ? "bg-[#2d4817]/5 border-t-2 border-[#2d4817]"
                        : "bg-white"
                    }`}
                  >
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3
                        className={`text-xl font-bold ${
                          selectedRound.team2?.id === teamData?.id ? "text-[#2d4817]" : "text-gray-900"
                        }`}
                      >
                        {selectedRound.team2?.team_id}
                      </h3>
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

export default RoundDetails
