import { Card, CardContent } from "@/components/ui/card"
import { Users, School, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

const Overview = ({ overviewData }) => {
  const [daysUntilCompetition, setDaysUntilCompetition] = useState(0)
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0)

  useEffect(() => {
    if (overviewData?.upcoming_deadline?.deadline) {
      const deadlineDate = new Date(overviewData.upcoming_deadline.deadline)
      const now = new Date()
      const diffTime = deadlineDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilDeadline(diffDays)
    }
    // Placeholder for competition start date
    const competitionStartDate = new Date("2025-12-15T09:00:00")
    const now = new Date()
    const diffTime = competitionStartDate.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    setDaysUntilCompetition(diffDays)
  }, [overviewData])

  if (!overviewData) {
    return <div>Loading...</div>
  }

  const { team_details, competition_progress, upcoming_deadline } = overviewData

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Welcome Section */}
      <Card className="bg-[#2d4817] text-white border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-green-100 mb-6">
                Utilize this space to add Add some Description here or more Information about the competition or welcome
                description
              </p>

              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">Your Competition Progress</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Total Teams Card */}
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
                        <div className="h-full w-[80%] bg-[#2d4817] rounded-full"></div> {/* Progress bar */}
                      </div>
                      <div className="text-xs text-gray-500">{competition_progress.total_teams} Teams</div>
                    </div>
                  </div>

                  {/* Qualified for Round 2 Card */}
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
                        <div className="h-full w-[50%] bg-[#2d4817] rounded-full"></div> {/* Progress bar */}
                      </div>
                      <div className="text-xs text-gray-500">{competition_progress.qualified_for_round_2} Teams</div>
                    </div>
                  </div>

                  {/* Rounds Completed Card */}
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
                        <div className="h-full w-[75%] bg-[#2d4817] rounded-full"></div> {/* Progress bar */}
                      </div>
                      <div className="text-xs text-gray-500">{competition_progress.rounds_completed} Rounds</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Competition Starts In Block */}
            <div className="bg-white text-gray-900 border border-[#2d4817] rounded-lg p-4 text-center flex-shrink-0 w-full md:w-auto">
              <p className="text-sm text-gray-900 mb-1">Competition starts in</p>
              <div className="bg-[#2d4817] text-white rounded-md p-2 mb-2 inline-block min-w-[80px]">
                <div className="text-6xl font-bold">{daysUntilCompetition}</div>
              </div>
              <p className="text-sm text-gray-900">DAYS</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Deadline Alert */}
      <Card className="border-red-200 bg-red-50 shadow-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-800">Upcoming Deadline</h3>
              <p className="text-sm text-red-600">
                {upcoming_deadline.title} submission deadline is in {daysUntilDeadline} days ({new Date(upcoming_deadline.deadline).toLocaleDateString()})
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Information and University */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Card */}
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

        {/* University Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <School className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">University</h3>
            <p className="text-sm text-gray-600">{team_details.university}</p>
          </CardContent>
        </Card>

        {/* Team Members Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Team Members</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {team_details.participants.map((participant, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <img
                    src={participant.avatar || "/placeholder.svg"}
                    alt={participant.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover border-2 border-[#2d4817] mb-2"
                  />
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
