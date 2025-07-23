// app/tournaments/jessup-2025/finals/page.jsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Trophy, Calendar, Clock, Users, Star, MapPin, Gavel, Award } from "lucide-react"
import { useState } from "react"

// Demo final match data
const finalMatch = {
  match_id: "F-001",
  match_name: "Grand Final",
  court_room: "Grand Hall",
  date: "2025-09-29",
  time: "14:00",
  status: "scheduled", // scheduled, ongoing, completed
  applicant_team: {
    team_code: "JQ2025-SF1W", // Placeholder for winner of SF1
    team_name: "TBD (Winner SF1)",
    university: "TBD",
    participants: [
      // Participants will be updated once the semi final winner is known
    ]
  },
  respondent_team: {
    team_code: "JQ2025-SF2W", // Placeholder for winner of SF2
    team_name: "TBD (Winner SF2)",
    university: "TBD",
    participants: [
      // Participants will be updated once the semi final winner is known
    ]
  },
  judges: [
    { name: "Chief Justice", title: "Supreme Court" },
    { name: "Justice A", title: "Court of Appeal" },
    { name: "Justice B", title: "Court of Appeal" },
    { name: "Justice C", title: "Court of Appeal" }
  ],
  case_details: {
    case_title: "The Ultimate Jessup Case",
    case_number: "F2025/001",
    time_limit: "90 minutes per side"
  }
};

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

const Finals = () => {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Grand Final</h1>
        <p className="text-lg opacity-90">Jessup Moot Court Competition 2025</p>
        <p className="text-sm opacity-75">{formatDate(finalMatch.date)}</p>
      </div>

      {/* Tournament Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-900">2</p>
            <p className="text-xs text-blue-700">Teams Competing</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Gavel className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-900">1</p>
            <p className="text-xs text-green-700">Final Match</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <MapPin className="h-6 w-6 text-purple-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-purple-900">Grand Hall</p>
            <p className="text-xs text-purple-700">Venue</p>
          </CardContent>
        </Card>
        <Card className="bg-orange-50 border-orange-200">
          <CardContent className="p-4 text-center">
            <Star className="h-6 w-6 text-orange-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-orange-900">4+</p>
            <p className="text-xs text-orange-700">Judges Panel</p>
          </CardContent>
        </Card>
      </div>

      {/* Final Match Card */}
      <Card className="shadow-lg">
        <CardContent className="p-6">
          {/* Match Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-semibold text-xl text-gray-900 flex items-center gap-2">
                <Award className="h-5 w-5 text-yellow-500" />
                {finalMatch.match_name}
              </h3>
              <p className="text-lg text-gray-700 font-medium">{finalMatch.case_details.case_title}</p>
            </div>
            <div className="text-right">
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(finalMatch.status)}`}>
                {getStatusIcon(finalMatch.status)}
                {finalMatch.status.charAt(0).toUpperCase() + finalMatch.status.slice(1)}
              </span>
            </div>
          </div>

          {/* Match Details */}
          <div className="flex flex-wrap justify-between text-sm text-gray-600 mb-6 gap-4">
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {finalMatch.court_room}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(finalMatch.date)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {formatTime(finalMatch.time)}
            </span>
          </div>

          {/* Teams */}
          <div className="space-y-4 md:space-y-0 md:flex md:justify-between md:items-center">
            {/* Applicant Team */}
            <div className="flex flex-col items-center md:w-2/5">
              <div className="w-full p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-center">
                  <p className="font-medium text-gray-900">{finalMatch.applicant_team.team_name}</p>
                  <p className="text-xs text-gray-600">{finalMatch.applicant_team.university}</p>
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold text-blue-600">Applicant</div>
            </div>

            {/* VS Divider */}
            <div className="text-center md:w-1/5">
              <span className="bg-gray-800 text-white px-4 py-2 rounded-full text-lg font-bold">VS</span>
            </div>

            {/* Respondent Team */}
            <div className="flex flex-col items-center md:w-2/5">
              <div className="w-full p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-center">
                  <p className="font-medium text-gray-900">{finalMatch.respondent_team.team_name}</p>
                  <p className="text-xs text-gray-600">{finalMatch.respondent_team.university}</p>
                </div>
              </div>
              <div className="mt-2 text-sm font-semibold text-red-600">Respondent</div>
            </div>
          </div>

          {/* Expand Button */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="py-2 px-6 bg-[#2d4817] text-white rounded-md hover:bg-[#3d5a1f] transition-colors"
            >
              {showDetails ? 'Hide Match Details' : 'View Match Details'}
            </button>
          </div>

          {/* Expanded Details */}
          {showDetails && (
            <div className="mt-8 border-t pt-6 space-y-6">
              {/* Case Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Gavel className="h-4 w-4" />
                  Case Details
                </h4>
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <p className="mb-1"><span className="font-medium">Case Number:</span> {finalMatch.case_details.case_number}</p>
                  <p><span className="font-medium">Time Limit:</span> {finalMatch.case_details.time_limit}</p>
                </div>
              </div>

              {/* Judges Panel */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  Judges Panel
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {finalMatch.judges.map((judge, index) => (
                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded">
                      <div className="w-10 h-10 bg-gray-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Applicant Team Members
                  </h4>
                  <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">Team members will be updated after the semi finals.</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Respondent Team Members
                  </h4>
                  <p className="text-sm text-gray-500 italic bg-gray-50 p-3 rounded">Team members will be updated after the semi finals.</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Championship Bracket Visualization */}
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg text-gray-900 mb-4">Championship Bracket</h3>
          <div className="overflow-x-auto">
            <div className="min-w-[400px] flex justify-center">
              <div className="space-y-6 w-full max-w-md">
                {/* Final Match */}
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <h4 className="font-medium text-gray-700 mb-2">Grand Final</h4>
                  <div className="space-y-2">
                    <div className="p-2 rounded text-sm bg-white border">
                      {finalMatch.applicant_team.team_name}
                    </div>
                    <div className="text-xs text-gray-500">vs</div>
                    <div className="p-2 rounded text-sm bg-white border">
                      {finalMatch.respondent_team.team_name}
                    </div>
                  </div>
                  <div className="mt-3 flex justify-center">
                    <Trophy className="h-6 w-6 text-yellow-500" />
                    <span className="ml-2 text-sm font-semibold text-yellow-700">Champion</span>
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

export default Finals
