import { Card, CardContent } from "@/components/ui/card"
import { Users, School, AlertCircle, Trophy } from "lucide-react"
import { useEffect, useState } from "react"

// Demo teams data array - 10 teams for testing
const demoTeamsData = [
  {
    team_details: {
      team_code: "JQ2025-001",
      team_name: "Legal Eagles",
      university: "University of Colombo",
      participants: [
        { name: "Amara Silva" },
        { name: "Kasun Perera" },
        { name: "Nisha Fernando" },
        { name: "Ravindu Jayasinghe" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 12
    },
    upcoming_deadline: {
      title: "Memorial Submission",
      deadline: "2025-08-30T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-002",
      team_name: "Justice Warriors",
      university: "University of Peradeniya",
      participants: [
        { name: "Dilshan Wickramasinghe" },
        { name: "Priya Kumari" },
        { name: "Chathura Mendis" },
        { name: "Shalini Rathnayake" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 8
    },
    upcoming_deadline: {
      title: "Round 1 Preparation",
      deadline: "2025-09-15T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-003",
      team_name: "Moot Masters",
      university: "University of Kelaniya",
      participants: [
        { name: "Thilini Jayawardena" },
        { name: "Ruwan Senanayake" },
        { name: "Malith Fernando" },
        { name: "Anusha Perera" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 15
    },
    upcoming_deadline: {
      title: "Research Submission",
      deadline: "2025-08-25T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-004",
      team_name: "Advocate Alliance",
      university: "University of Ruhuna",
      participants: [
        { name: "Sampath Gunasekara" },
        { name: "Vindya Dissanayake" },
        { name: "Lahiru Gamage" },
        { name: "Iresha Madushani" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 6
    },
    upcoming_deadline: {
      title: "Case Analysis",
      deadline: "2025-09-05T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-005",
      team_name: "Court Crusaders",
      university: "University of Jaffna",
      participants: [
        { name: "Kavitha Rajendran" },
        { name: "Arun Sivakumar" },
        { name: "Meera Thavarajah" },
        { name: "Niranjan Selvarajah" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 10
    },
    upcoming_deadline: {
      title: "Preliminary Round",
      deadline: "2025-09-10T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-006",
      team_name: "Law Legends",
      university: "University of Moratuwa",
      participants: [
        { name: "Dilan Ratnayake" },
        { name: "Sanduni Weerasinghe" },
        { name: "Isuru Bandara" },
        { name: "Chamodi Herath" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 14
    },
    upcoming_deadline: {
      title: "Brief Submission",
      deadline: "2025-08-28T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-007",
      team_name: "Verdict Vanguards",
      university: "University of Sri Jayewardenepura",
      participants: [
        { name: "Hasitha Amarasinghe" },
        { name: "Tharushi Pathirana" },
        { name: "Buddhika Silva" },
        { name: "Nethmi Gunathilake" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 9
    },
    upcoming_deadline: {
      title: "Opening Statement",
      deadline: "2025-09-12T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-008",
      team_name: "Judicial Jaguars",
      university: "Eastern University",
      participants: [
        { name: "Mohamed Rishad" },
        { name: "Fatima Nazreen" },
        { name: "Ahmed Farhan" },
        { name: "Zainab Hussain" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 7
    },
    upcoming_deadline: {
      title: "Evidence Review",
      deadline: "2025-09-08T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-009",
      team_name: "Litigation Lions",
      university: "Sabaragamuwa University",
      participants: [
        { name: "Janith Wijesinghe" },
        { name: "Pavithra Gunasekara" },
        { name: "Supun Rathnayake" },
        { name: "Dinusha Perera" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 11
    },
    upcoming_deadline: {
      title: "Final Arguments",
      deadline: "2025-09-20T23:59:59"
    }
  },
  {
    team_details: {
      team_code: "JQ2025-010",
      team_name: "Tribunal Titans",
      university: "Wayamba University",
      participants: [
        { name: "Chamara Wickramage" },
        { name: "Shanika Jayasundara" },
        { name: "Lakmal Seneviratne" },
        { name: "Achini Maduwanthi" }
      ]
    },
    competition_progress: {
      total_teams: 156,
      total_rounds: 4,
      total_memorial: 13
    },
    upcoming_deadline: {
      title: "Cross-Examination Prep",
      deadline: "2025-09-18T23:59:59"
    }
  }
];

const AllTeams = () => {
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [selectedCard, setSelectedCard] = useState(null)
  const [currentTeamIndex, setCurrentTeamIndex] = useState(0)

  const registrationEndDate = new Date("2025-08-15T00:00:00")

  // Get current team data
  const currentTeamData = demoTeamsData[currentTeamIndex]

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
    if (currentTeamData?.upcoming_deadline?.deadline) {
      const deadlineDate = new Date(currentTeamData.upcoming_deadline.deadline)
      const now = new Date()
      const diffTime = deadlineDate.getTime() - now.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      setDaysUntilDeadline(diffDays)
    }
  }, [currentTeamIndex, currentTeamData])

  const { team_details, competition_progress, upcoming_deadline } = currentTeamData

  const handleCardClick = (cardType) => {
    setSelectedCard(selectedCard === cardType ? null : cardType)
  }

  const handleTeamChange = (index) => {
    setCurrentTeamIndex(index)
    setSelectedCard(null) // Reset selected card when changing teams
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Team Selector */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Select Demo Team</h2>
        <div className="flex flex-wrap gap-2">
          {demoTeamsData.map((team, index) => (
            <button
              key={team.team_details.team_code}
              onClick={() => handleTeamChange(index)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                currentTeamIndex === index
                  ? 'bg-[#2d4817] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {team.team_details.team_code}
            </button>
          ))}
        </div>
      </div>

      {/* Current Team Overview */}
      <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white mb-6">
        <h1 className="text-2xl font-bold mb-2">{team_details.team_name}</h1>
        <p className="text-lg opacity-90">{team_details.university}</p>
        <p className="text-sm opacity-75">Team Code: {team_details.team_code}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-5 text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-blue-900">{competition_progress.total_teams}</p>
            <p className="text-sm text-blue-700">Total Teams</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-5 text-center">
            <Trophy className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-green-900">{competition_progress.total_rounds}</p>
            <p className="text-sm text-green-700">Total Rounds</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-5 text-center">
            <School className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-purple-900">{competition_progress.total_memorial}</p>
            <p className="text-sm text-purple-700">Memorial Submissions</p>
          </CardContent>
        </Card>
        
        
      </div>

      {/* Main Content Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Team Information Card */}
        <Card 
          className={`shadow-sm cursor-pointer transition-all duration-300 ${
            selectedCard === 'team' ? 'ring-2 ring-[#2d4817] shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => handleCardClick('team')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <Users className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">Team Information</h3>
            <p className="text-sm text-gray-600 mb-2">Click to view details</p>
            
            {selectedCard === 'team' && (
              <div className="mt-4 w-full border-t pt-4 space-y-3">
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Team Code & Name</p>
                  <p className="text-sm font-medium text-gray-900">
                    {team_details.team_code} ({team_details.team_name})
                  </p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">University</p>
                  <p className="text-sm font-medium text-gray-900">{team_details.university}</p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-2">Team Members</p>
                  <div className="grid grid-cols-2 gap-2">
                    {team_details.participants.map((participant, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#2d4817] text-white flex items-center justify-center text-xs font-semibold">
                          {participant.name.charAt(0).toUpperCase()}
                        </div>
                        <p className="text-xs text-gray-600">{participant.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Competition Progress Card */}
        <Card 
          className={`shadow-sm cursor-pointer transition-all duration-300 ${
            selectedCard === 'progress' ? 'ring-2 ring-[#2d4817] shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => handleCardClick('progress')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <Trophy className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">Competition Progress</h3>
            <p className="text-sm text-gray-600 mb-2">Click to view details</p>
            
            {selectedCard === 'progress' && (
              <div className="mt-4 w-full border-t pt-4 space-y-3">
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Current Standing</p>
                  <p className="text-sm font-medium text-gray-900">
                    Round 1 of {competition_progress.total_rounds}
                  </p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Memorial Status</p>
                  <p className="text-sm font-medium text-gray-900">
                    {competition_progress.total_memorial} submissions completed
                  </p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Competition Status</p>
                  <p className="text-sm font-medium text-green-600">Active Participant</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Upcoming Deadline Card */}
        <Card 
          className={`shadow-sm cursor-pointer transition-all duration-300 ${
            selectedCard === 'deadline' ? 'ring-2 ring-[#2d4817] shadow-lg' : 'hover:shadow-md'
          }`}
          onClick={() => handleCardClick('deadline')}
        >
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border border-[#2d4817] mb-3">
              <AlertCircle className="h-6 w-6 text-[#2d4817]" />
            </div>
            <h3 className="font-semibold text-gray-900">Upcoming Deadline</h3>
            <p className="text-sm text-gray-600 mb-2">Click to view details</p>
            
            {selectedCard === 'deadline' && (
              <div className="mt-4 w-full border-t pt-4 space-y-3">
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Task</p>
                  <p className="text-sm font-medium text-gray-900">{upcoming_deadline.title}</p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Deadline</p>
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(upcoming_deadline.deadline).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
                
                <div className="text-left">
                  <p className="text-xs text-gray-500 mb-1">Time Remaining</p>
                  <p className={`text-sm font-medium ${daysUntilDeadline <= 7 ? 'text-red-600' : 'text-green-600'}`}>
                    {daysUntilDeadline > 0 ? `${daysUntilDeadline} days remaining` : 'Deadline passed'}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Registration Countdown */}
      <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200">
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-red-900 mb-2">Registration Ends In:</h3>
          <div className="flex justify-center gap-4 text-red-800">
            <div>
              <span className="text-2xl font-bold">{timeLeft.days}</span>
              <p className="text-xs">Days</p>
            </div>
            <div>
              <span className="text-2xl font-bold">{timeLeft.hours}</span>
              <p className="text-xs">Hours</p>
            </div>
            <div>
              <span className="text-2xl font-bold">{timeLeft.minutes}</span>
              <p className="text-xs">Minutes</p>
            </div>
            <div>
              <span className="text-2xl font-bold">{timeLeft.seconds}</span>
              <p className="text-xs">Seconds</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AllTeams