import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Clock, Users, Star, MapPin, Gavel } from "lucide-react"
import { useEffect, useState } from "react"

// Demo quarter final matches data
const quarterFinalMatches = [
  {
    match_id: "QF-001",
    match_name: "Quarter Final 1",
    court_room: "Court A",
    date: "2025-09-25",
    time: "09:00",
    status: "scheduled", // scheduled, ongoing, completed
    applicant_team: {
      team_code: "JQ2025-001",
      team_name: "Legal Eagles",
      university: "University of Colombo",
      seed: 1,
      previous_score: 85.5,
      participants: [
        { name: "Amara Silva", role: "Lead Counsel" },
        { name: "Kasun Perera", role: "Co-Counsel" },
        { name: "Nisha Fernando", role: "Researcher" },
        { name: "Ravindu Jayasinghe", role: "Researcher" }
      ]
    },
    respondent_team: {
      team_code: "JQ2025-008",
      team_name: "Judicial Jaguars",
      university: "Eastern University",
      seed: 8,
      previous_score: 78.2,
      participants: [
        { name: "Mohamed Rishad", role: "Lead Counsel" },
        { name: "Fatima Nazreen", role: "Co-Counsel" },
        { name: "Ahmed Farhan", role: "Researcher" },
        { name: "Zainab Hussain", role: "Researcher" }
      ]
    },
    judges: [
      { name: "Hon. Justice K.T. Chitrasiri", title: "Supreme Court Judge" },
      { name: "Hon. Justice S.P. Wanasundera", title: "Court of Appeal Judge" },
      { name: "Dr. Rohan Samarajiva", title: "Senior Attorney-at-Law" }
    ],
    case_details: {
      case_title: "International Trade Dispute",
      case_number: "QF2025/001",
      time_limit: "45 minutes per side"
    }
  },
  {
    match_id: "QF-002",
    match_name: "Quarter Final 2",
    court_room: "Court B",
    date: "2025-09-25",
    time: "11:30",
    status: "ongoing",
    applicant_team: {
      team_code: "JQ2025-002",
      team_name: "Justice Warriors",
      university: "University of Peradeniya",
      seed: 2,
      previous_score: 83.8,
      participants: [
        { name: "Dilshan Wickramasinghe", role: "Lead Counsel" },
        { name: "Priya Kumari", role: "Co-Counsel" },
        { name: "Chathura Mendis", role: "Researcher" },
        { name: "Shalini Rathnayake", role: "Researcher" }
      ]
    },
    respondent_team: {
      team_code: "JQ2025-007",
      team_name: "Verdict Vanguards",
      university: "University of Sri Jayewardenepura",
      seed: 7,
      previous_score: 79.6,
      participants: [
        { name: "Hasitha Amarasinghe", role: "Lead Counsel" },
        { name: "Tharushi Pathirana", role: "Co-Counsel" },
        { name: "Buddhika Silva", role: "Researcher" },
        { name: "Nethmi Gunathilake", role: "Researcher" }
      ]
    },
    judges: [
      { name: "Hon. Justice A.H.M.D. Nawaz", title: "Supreme Court Judge" },
      { name: "Hon. Justice P.R. Walgampaya", title: "Court of Appeal Judge" },
      { name: "Ms. Manisha Gunasekera", title: "President's Counsel" }
    ],
    case_details: {
      case_title: "Constitutional Rights Violation",
      case_number: "QF2025/002",
      time_limit: "45 minutes per side"
    }
  },
  {
    match_id: "QF-003",
    match_name: "Quarter Final 3",
    court_room: "Court C",
    date: "2025-09-25",
    time: "14:00",
    status: "scheduled",
    applicant_team: {
      team_code: "JQ2025-003",
      team_name: "Moot Masters",
      university: "University of Kelaniya",
      seed: 3,
      previous_score: 82.1,
      participants: [
        { name: "Thilini Jayawardena", role: "Lead Counsel" },
        { name: "Ruwan Senanayake", role: "Co-Counsel" },
        { name: "Malith Fernando", role: "Researcher" },
        { name: "Anusha Perera", role: "Researcher" }
      ]
    },
    respondent_team: {
      team_code: "JQ2025-006",
      team_name: "Law Legends",
      university: "University of Moratuwa",
      seed: 6,
      previous_score: 80.3,
      participants: [
        { name: "Dilan Ratnayake", role: "Lead Counsel" },
        { name: "Sanduni Weerasinghe", role: "Co-Counsel" },
        { name: "Isuru Bandara", role: "Researcher" },
        { name: "Chamodi Herath", role: "Researcher" }
      ]
    },
    judges: [
      { name: "Hon. Justice B.P. Aluwihare", title: "Supreme Court Judge" },
      { name: "Hon. Justice M.M.A. Gaffoor", title: "Court of Appeal Judge" },
      { name: "Mr. Romesh de Silva", title: "President's Counsel" }
    ],
    case_details: {
      case_title: "Environmental Protection Law",
      case_number: "QF2025/003",
      time_limit: "45 minutes per side"
    }
  },
  {
    match_id: "QF-004",
    match_name: "Quarter Final 4",
    court_room: "Court D",
    date: "2025-09-25",
    time: "16:30",
    status: "completed",
    applicant_team: {
      team_code: "JQ2025-004",
      team_name: "Advocate Alliance",
      university: "University of Ruhuna",
      seed: 4,
      previous_score: 81.7,
      participants: [
        { name: "Sampath Gunasekara", role: "Lead Counsel" },
        { name: "Vindya Dissanayake", role: "Co-Counsel" },
        { name: "Lahiru Gamage", role: "Researcher" },
        { name: "Iresha Madushani", role: "Researcher" }
      ]
    },
    respondent_team: {
      team_code: "JQ2025-005",
      team_name: "Court Crusaders",
      university: "University of Jaffna",
      seed: 5,
      previous_score: 80.8,
      participants: [
        { name: "Kavitha Rajendran", role: "Lead Counsel" },
        { name: "Arun Sivakumar", role: "Co-Counsel" },
        { name: "Meera Thavarajah", role: "Researcher" },
        { name: "Niranjan Selvarajah", role: "Researcher" }
      ]
    },
    judges: [
      { name: "Hon. Justice E.A.G.R. Amarasekara", title: "Supreme Court Judge" },
      { name: "Hon. Justice K.K. Wickremasinghe", title: "Court of Appeal Judge" },
      { name: "Dr. Jayantha Fernando", title: "Senior Attorney-at-Law" }
    ],
    case_details: {
      case_title: "Corporate Governance Dispute",
      case_number: "QF2025/004",
      time_limit: "45 minutes per side"
    },
    winner: "JQ2025-004", // Advocate Alliance won
    final_scores: {
      applicant: 87.5,
      respondent: 84.2
    }
  }
];

const QuarterFinal = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'ongoing': return 'bg-yellow-100 text-yellow-800'
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <Trophy className="h-4 w-4" />
      case 'ongoing': return <Clock className="h-4 w-4" />
      case 'scheduled': return <Calendar className="h-4 w-4" />
      default: return <Calendar className="h-4 w-4" />
    }
  }

  const formatTime = (time) => {
    return new Date(`2025-01-01T${time}:00`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Quarter Finals</h1>
        <p className="text-lg opacity-90">Jessup Moot Court Competition 2025</p>
        <p className="text-sm opacity-75">{formatDate('2025-09-25')}</p>
      </div>

      {/* Tournament Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-900">8</p>
            <p className="text-xs text-blue-700">Teams Remaining</p>
          </CardContent>
        </Card>
        
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Gavel className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-900">4</p>
            <p className="text-xs text-green-700">Matches Today</p>
          </CardContent>
        </Card>
        
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-purple-900">4</p>
            <p className="text-xs text-purple-700">Court Rooms</p>
          </CardContent>
        </Card>
        
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-orange-900">12</p>
            <p className="text-xs text-orange-700">Judges Panel</p>
          </CardContent>
        </Card>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {quarterFinalMatches.map((match) => (
          <Card 
            key={match.match_id}
            className={`shadow-sm cursor-pointer transition-all duration-300 ${
              selectedMatch === match.match_id ? 'ring-2 ring-[#2d4817] shadow-lg' : 'hover:shadow-md'
            }`}
            onClick={() => setSelectedMatch(selectedMatch === match.match_id ? null : match.match_id)}
          >
            <CardContent className="p-6">
              {/* Match Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">{match.match_name}</h3>
                  <p className="text-sm text-gray-600">{match.case_details.case_title}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(match.status)}`}>
                    {getStatusIcon(match.status)}
                    {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Match Details */}
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {match.court_room}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatTime(match.time)}
                </span>
              </div>

              {/* Teams */}
              <div className="space-y-3">
                {/* Applicant Team */}
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {match.applicant_team.seed}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{match.applicant_team.team_name}</p>
                      <p className="text-xs text-gray-600">{match.applicant_team.university}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">Applicant</p>
                    {match.status === 'completed' && match.final_scores && (
                      <p className="text-xs text-gray-600">Score: {match.final_scores.applicant}</p>
                    )}
                  </div>
                </div>

                {/* VS Divider */}
                <div className="text-center">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">VS</span>
                </div>

                {/* Respondent Team */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                      {match.respondent_team.seed}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{match.respondent_team.team_name}</p>
                      <p className="text-xs text-gray-600">{match.respondent_team.university}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">Respondent</p>
                    {match.status === 'completed' && match.final_scores && (
                      <p className="text-xs text-gray-600">Score: {match.final_scores.respondent}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Winner Badge */}
              {match.status === 'completed' && match.winner && (
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Trophy className="h-4 w-4" />
                    Winner: {match.winner === match.applicant_team.team_code ? match.applicant_team.team_name : match.respondent_team.team_name}
                  </div>
                </div>
              )}

              {/* Expanded Details */}
              {selectedMatch === match.match_id && (
                <div className="mt-6 border-t pt-6 space-y-4">
                  {/* Case Details */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Case Details</h4>
                    <div className="bg-gray-50 p-3 rounded-lg text-sm">
                      <p><span className="font-medium">Case Number:</span> {match.case_details.case_number}</p>
                      <p><span className="font-medium">Time Limit:</span> {match.case_details.time_limit}</p>
                    </div>
                  </div>

                  {/* Judges Panel */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Judges Panel</h4>
                    <div className="space-y-2">
                      {match.judges.map((judge, index) => (
                        <div key={index} className="flex items-center gap-3 bg-gray-50 p-2 rounded">
                          <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center text-xs font-semibold">
                            {judge.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{judge.name}</p>
                            <p className="text-xs text-gray-600">{judge.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Applicant Team Members</h4>
                      <div className="space-y-1">
                        {match.applicant_team.participants.map((member, index) => (
                          <div key={index} className="flex justify-between text-sm bg-blue-50 p-2 rounded">
                            <span>{member.name}</span>
                            <span className="text-blue-600">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Respondent Team Members</h4>
                      <div className="space-y-1">
                        {match.respondent_team.participants.map((member, index) => (
                          <div key={index} className="flex justify-between text-sm bg-red-50 p-2 rounded">
                            <span>{member.name}</span>
                            <span className="text-red-600">{member.role}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tournament Bracket Visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Tournament Bracket</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[800px] flex justify-center">
              <div className="space-y-8">
                {/* Quarter Finals */}
                <div className="text-center">
                  <h4 className="font-medium text-gray-700 mb-4">Quarter Finals</h4>
                  <div className="grid grid-cols-4 gap-4">
                    {quarterFinalMatches.map((match, index) => (
                      <div key={match.match_id} className="text-center">
                        <div className="space-y-2">
                          <div className={`p-2 rounded text-xs ${match.winner === match.applicant_team.team_code ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-100'}`}>
                            {match.applicant_team.team_name}
                          </div>
                          <div className="text-xs text-gray-500">vs</div>
                          <div className={`p-2 rounded text-xs ${match.winner === match.respondent_team.team_code ? 'bg-green-100 border-2 border-green-400' : 'bg-gray-100'}`}>
                            {match.respondent_team.team_name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Semi Finals Preview */}
                <div className="text-center border-t pt-6">
                  <h4 className="font-medium text-gray-700 mb-4">Semi Finals (Upcoming)</h4>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Winner QF1 vs Winner QF2</p>
                      <p className="text-xs text-gray-500 mt-1">Semi Final 1</p>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600">Winner QF3 vs Winner QF4</p>
                      <p className="text-xs text-gray-500 mt-1">Semi Final 2</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuarterFinal