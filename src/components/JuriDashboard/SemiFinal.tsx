// app/tournaments/jessup-2025/semi-finals/page.jsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Clock, Users, Star, MapPin, Gavel } from "lucide-react"
import { useState } from "react"

// Demo semi-final matches data
const semiFinalMatches = [
  {
    match_id: "SF-001",
    match_name: "Semi Final 1",
    court_room: "Main Court",
    date: "2025-09-27",
    time: "10:00",
    status: "scheduled", // scheduled, ongoing, completed
    applicant_team: {
      team_code: "JQ2025-QF1W", // Placeholder for winner of QF1
      team_name: "TBD (Winner QF1)",
      university: "TBD",
      participants: [
        // Participants will be updated once the quarter final winner is known
      ]
    },
    respondent_team: {
      team_code: "JQ2025-QF2W", // Placeholder for winner of QF2
      team_name: "TBD (Winner QF2)",
      university: "TBD",
      participants: [
        // Participants will be updated once the quarter final winner is known
      ]
    },
    judges: [
      { name: "Chief Justice", title: "Supreme Court" },
      { name: "Justice A", title: "Court of Appeal" },
      { name: "Justice B", title: "Court of Appeal" }
    ],
    case_details: {
      case_title: "Complex International Law Issue",
      case_number: "SF2025/001",
      time_limit: "60 minutes per side"
    }
  },
  {
    match_id: "SF-002",
    match_name: "Semi Final 2",
    court_room: "Court A",
    date: "2025-09-27",
    time: "13:30",
    status: "scheduled",
    applicant_team: {
      team_code: "JQ2025-QF3W", // Placeholder for winner of QF3
      team_name: "TBD (Winner QF3)",
      university: "TBD",
      participants: [
        // Participants will be updated once the quarter final winner is known
      ]
    },
    respondent_team: {
      team_code: "JQ2025-QF4W", // Placeholder for winner of QF4
      team_name: "TBD (Winner QF4)",
      university: "TBD",
      participants: [
        // Participants will be updated once the quarter final winner is known
      ]
    },
    judges: [
      { name: "Chief Justice", title: "Supreme Court" },
      { name: "Justice C", title: "Court of Appeal" },
      { name: "Justice D", title: "Court of Appeal" }
    ],
    case_details: {
      case_title: "Advanced Constitutional Question",
      case_number: "SF2025/002",
      time_limit: "60 minutes per side"
    }
  }
];

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

const SemiFinals = () => {
  const [selectedMatch, setSelectedMatch] = useState(null)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Semi Finals</h1>
        <p className="text-lg opacity-90">Jessup Moot Court Competition 2025</p>
        <p className="text-sm opacity-75">{formatDate('2025-09-27')}</p>
      </div>

      {/* Tournament Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-900">4</p>
            <p className="text-xs text-blue-700">Teams Remaining</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Gavel className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-900">2</p>
            <p className="text-xs text-green-700">Matches</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-purple-900">2</p>
            <p className="text-xs text-purple-700">Court Rooms</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-orange-900">6</p>
            <p className="text-xs text-orange-700">Judges Panel</p>
          </CardContent>
        </Card>
      </div>

      {/* Matches Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {semiFinalMatches.map((match) => (
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
                  <div>
                    <p className="font-medium text-gray-900">{match.applicant_team.team_name}</p>
                    <p className="text-xs text-gray-600">{match.applicant_team.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-blue-600">Applicant</p>
                  </div>
                </div>
                {/* VS Divider */}
                <div className="text-center">
                  <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">VS</span>
                </div>
                {/* Respondent Team */}
                <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{match.respondent_team.team_name}</p>
                    <p className="text-xs text-gray-600">{match.respondent_team.university}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-600">Respondent</p>
                  </div>
                </div>
              </div>

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
                  {/* Team Members (Placeholder) */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Applicant Team Members</h4>
                      <p className="text-sm text-gray-500 italic">Team members will be updated after the quarter finals.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Respondent Team Members</h4>
                      <p className="text-sm text-gray-500 italic">Team members will be updated after the quarter finals.</p>
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
            <div className="min-w-[600px] flex justify-center">
              <div className="space-y-8">
                {/* Semi Finals */}
                <div className="text-center">
                  <h4 className="font-medium text-gray-700 mb-4">Semi Finals</h4>
                  <div className="grid grid-cols-2 gap-8">
                    {semiFinalMatches.map((match, index) => (
                      <div key={match.match_id} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="space-y-2">
                          <div className="p-2 rounded text-xs bg-gray-100">
                            {match.applicant_team.team_name}
                          </div>
                          <div className="text-xs text-gray-500">vs</div>
                          <div className="p-2 rounded text-xs bg-gray-100">
                            {match.respondent_team.team_name}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Finals Preview */}
                <div className="text-center border-t pt-6">
                  <h4 className="font-medium text-gray-700 mb-4">Final (Upcoming)</h4>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">Winner SF1 vs Winner SF2</p>
                    <p className="text-xs text-gray-500 mt-1">Final Match</p>
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

export default SemiFinals
