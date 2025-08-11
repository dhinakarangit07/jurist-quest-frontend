"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Eye, ChevronLeft, Video, Trophy, Clock, Target, Download, FileText } from "lucide-react"
import useRounds from "@/hooks/useRounds"
import useDownloads from "@/hooks/useDownloads"
import RoundDetailsSkeleton from "@/components/skeleton/TeamDashboard/RoundDetailsSkeleton"
import DownloadCenterSkeleton from "@/components/skeleton/TeamDashboard/DownloadCenterSkeleton"
import { format } from 'date-fns'

const RoundDetails = () => {
  const { rounds, isLoading, error } = useRounds()
  const { downloads, isLoading: isDownloadsLoading, error: downloadsError } = useDownloads()
  const [teamData, setTeamData] = useState(null)
  const [selectedRound, setSelectedRound] = useState(null)
  const [ongoingRound, setOngoingRound] = useState(null)
  const [upcomingRounds, setUpcomingRounds] = useState([])
  const [completedRounds, setCompletedRounds] = useState([])

  useEffect(() => {
    const storedTeamData = localStorage.getItem("team_data")
    if (storedTeamData) {
      setTeamData(JSON.parse(storedTeamData))
    }
  }, [])

  useEffect(() => {
    if (rounds) {
      const ongoing = rounds.find(r => r.status === 'ongoing')
      const upcoming = rounds.filter(r => r.status === 'upcoming')
      const completed = rounds.filter(r => r.status !== 'ongoing' && r.status !== 'upcoming')
      
      setOngoingRound(ongoing)
      setUpcomingRounds(upcoming)
      setCompletedRounds(completed)

      // Set default selected round to ongoing round or first upcoming round
      if (ongoing) {
        setSelectedRound(ongoing)
      } else if (upcoming.length > 0) {
        setSelectedRound(upcoming[0])
      }
    }
  }, [rounds])

  const handleDownload = (fileUrl: string) => {
    window.open(fileUrl, "_blank")
  }

  if (isLoading) {
    return <RoundDetailsSkeleton />
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error.message}</div>
  }

  if (!rounds || rounds.length === 0) {
    return (
      <div className="text-gray-500 p-6 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
          <Download className="h-8 w-8 text-gray-500" />
        </div>
        <h3 className="font-semibold text-gray-700 text-lg mb-2">No Materials Available</h3>
        <p className="text-sm text-gray-600">
          Your download materials will be available soon! Please check back later for the files and resources related to your round.
        </p>
      </div>

    )
  }

  const getCompletedRoundStatus = (round) => {
    if (round.status && round.status.startsWith("Winner:")) {
        const winnerTeamId = round.status.split(" ")[1]
        if (winnerTeamId === teamData?.team_id) {
            return "Won"
        } else {
            return "Lost"
        }
    }
    return "Evaluating"
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
                    <h2 className="text-xl font-bold text-gray-900">Ongoing Round</h2>
                    <p className="text-sm text-gray-500">Active competition</p>
                  </div>
                </div>

                {ongoingRound ? (
                  <div className="space-y-4">
                    <div className="bg-[#2d4817]/5 rounded-lg p-4">
                      <h3 className="font-semibold text-[#2d4817] mb-2">{ongoingRound.round_name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {ongoingRound.date} • {ongoingRound.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                        {ongoingRound.round_type === "online" ? (
                          <Video className="h-4 w-4" />
                        ) : (
                          <MapPin className="h-4 w-4" />
                        )}
                        <span>{ongoingRound.round_type === "online" ? "Online Meeting" : ongoingRound.venue}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Judge: {ongoingRound.judge}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-sm font-medium text-gray-500 mb-3">Match-up</h4>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{ongoingRound.team1?.team_id}</p>
                          <p className="text-xs text-gray-500">{ongoingRound.team1?.institution_name}</p>
                        </div>
                        <div className="px-3 py-1 bg-[#2d4817] text-white rounded-full text-xs font-medium">VS</div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{ongoingRound.team2?.team_id}</p>
                          <p className="text-xs text-gray-500">{ongoingRound.team2?.institution_name}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleViewDetails(ongoingRound)}
                      className="w-full bg-[#2d4817] hover:bg-[#233a12] text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center mx-auto mb-4">
                      <Clock className="h-8 w-8 text-gray-500" />
                    </div>
                    <h3 className="font-semibold text-gray-700 text-lg mb-2">No Ongoing Rounds</h3>
                    <p className="text-sm text-gray-600">Your round is about to begin soon! Please check back later for updates on your team assignments and round details.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Rounds Card */}
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
                      <span className="text-3xl font-bold text-blue-600">{upcomingRounds.length}</span>
                    </div>
                    <h3 className="font-semibold text-blue-700 text-lg mb-2">
                      {upcomingRounds.length === 0
                        ? "No Upcoming Rounds"
                        : upcomingRounds.length === 1
                          ? "1 Round Scheduled"
                          : `${upcomingRounds.length} Rounds Scheduled`}
                    </h3>
                    {upcomingRounds.length === 0 && (
                      <p className="text-sm text-gray-600">Your round is about to begin soon! Please check back later for updates on your team assignments and round details.</p>
                    )}
                  </div>

                  {upcomingRounds.length > 0 && (
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
                </div>
              </CardContent>
            </Card>

            {/* Completed Rounds Card */}
            <Card className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Trophy className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Completed Rounds</h2>
                    <p className="text-sm text-gray-500">Past performances</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {completedRounds.length > 0 ? (
                    completedRounds.map(round => {
                      const status = getCompletedRoundStatus(round)
                      return (
                        <div key={round.id} className={`rounded-lg p-4 text-center ${
                          status === "Won"
                            ? "bg-green-50 border border-green-200"
                            : status === "Lost"
                              ? "bg-red-50 border border-red-200"
                              : "bg-orange-50 border border-orange-200"
                        }`}>
                          <h3 className={`text-lg font-bold mb-1 ${
                            status === "Won"
                              ? "text-green-700"
                              : status === "Lost"
                                ? "text-red-700"
                                : "text-orange-700"
                          }`}>
                            {round.round_name}: {status}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {round.date}
                          </p>
                          <button
                            onClick={() => handleViewDetails(round)}
                            className="mt-2 text-sm text-blue-600 hover:underline"
                          >
                            View Details
                          </button>
                        </div>
                      )
                    })
                  ) : (
                    <div className="bg-gray-50 rounded-lg p-6 text-center">
                      <p className="text-sm text-gray-600">No completed rounds yet.</p>
                    </div>
                  )}
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
                        {selectedRound.team1?.team_id || "TBD"}
                      </h3>
                      <p className="text-sm text-gray-500">{selectedRound.team1?.institution_name || "To Be Assigned"}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Representative</p>
                        <p className="text-gray-900 font-medium">{selectedRound.team1?.team_representative_name || "TBD"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 1</p>
                        <p className="text-gray-900">
                          {selectedRound.team1?.speaker_1_name || "TBD"}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_1_course_type || "N/A"})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team1?.speaker_2_name || "TBD"}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_2_course_type || "N/A"})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</p>
                        <p className="text-gray-900">{selectedRound.team1?.researcher_name || "TBD"}</p>
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
                        {selectedRound.team2?.team_id || "TBD"}
                      </h3>
                      <p className="text-sm text-gray-500">{selectedRound.team2?.institution_name || "To Be Assigned"}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Representative</p>
                        <p className="text-gray-900 font-medium">{selectedRound.team2?.team_representative_name || "TBD"}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 1</p>
                        <p className="text-gray-900">
                          {selectedRound.team2?.speaker_1_name || "TBD"}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_1_course_type || "N/A"})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team2?.speaker_2_name || "TBD"}{" "}
                          <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_2_course_type || "N/A"})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Researcher</p>
                        <p className="text-gray-900">{selectedRound.team2?.researcher_name || "TBD"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Center */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl text-gray-900">Competition Materials</CardTitle>
                <CardDescription>
                  Essential Documents and Resources for the Competition
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isDownloadsLoading ? (
                  <DownloadCenterSkeleton />
                ) : downloadsError ? (
                  <div className="text-red-500 p-6">Error: {downloadsError.message}</div>
                ) : (
                  <>
                    {/* Desktop/tablet table view */}
                    <div className="w-full overflow-x-auto hidden sm:block">
                      <table className="min-w-[600px] w-full border-collapse border border-slate-300 text-xs sm:text-sm">
                        <thead>
                          <tr className="bg-slate-100">
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Name</th>
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Format</th>
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Size</th>
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Uploaded On</th>
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900">Deadline</th>
                            <th className="py-2 sm:py-3 px-2 sm:px-4 text-left font-medium text-gray-900"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {downloads.map((item, index) => (
                            <tr key={index} className="border-b border-slate-200 hover:bg-slate-50">
                              <td className="py-3 sm:py-4 px-2 sm:px-4 flex items-center gap-2 sm:gap-3">
                                <FileText className="h-4 w-4 text-gray-500" />
                                <div className="flex items-center gap-1 sm:gap-2">
                                  <span className="font-medium text-gray-900 text-xs sm:text-sm">{item.name}</span>
                                  {item.important && (
                                    <Badge className="bg-red-500 text-white text-[10px] sm:text-xs rounded-md px-1.5 py-0.5 sm:px-2 sm:py-1">
                                      Important
                                    </Badge>
                                  )}
                                </div>
                              </td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.format}</td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.size}</td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{format(new Date(item.created_at), 'dd/MM/yyyy')}</td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4 text-gray-600">{item.deadline ? format(new Date(item.deadline), 'dd/MM/yyyy HH:mm') : "N/A"}</td>
                              <td className="py-3 sm:py-4 px-2 sm:px-4">
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(item.file)}
                                  className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1"
                                >
                                  <Download className="h-4 w-4" />
                                  <span className="hidden xs:inline">Download</span>
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {/* Mobile card/list view */}
                    <div className="block sm:hidden space-y-4">
                      {downloads.map((item, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-3 flex flex-col gap-2 bg-slate-50">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-gray-500" />
                            <span className="font-medium text-gray-900 text-sm">{item.name}</span>
                            {item.important && (
                              <Badge className="bg-red-500 text-white text-[10px] rounded-md px-2 py-0.5 ml-2">
                                Important
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                            <span><b>Format:</b> {item.format}</span>
                            <span><b>Size:</b> {item.size}</span>
                          </div>
                          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
                            <span><b>Uploaded:</b> {format(new Date(item.created_at), 'dd/MM/yyyy')}</span>
                            <span><b>Deadline:</b> {item.deadline ? format(new Date(item.deadline), 'dd/MM/yyyy HH:mm') : "N/A"}</span>
                          </div>
                          <div>
                            <Button
                              size="sm"
                              onClick={() => handleDownload(item.file)}
                              className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1 w-full justify-center"
                            >
                              <Download className="h-4 w-4" />
                              Download
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default RoundDetails
