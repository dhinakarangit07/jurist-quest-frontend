// app/tournaments/jessup-2025/preliminary-rounds/page.jsx
"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Users, MapPin, Trophy, Gavel, Star } from "lucide-react"
import { useState } from "react"

// Demo preliminary rounds data
const preliminaryRoundsData = [
  {
    round_number: 1,
    date: "2025-09-20",
    matches: [
      {
        match_id: "P1-001",
        court_room: "Court A",
        time: "09:00",
        status: "completed",
        applicant_team: {
          team_code: "JQ2025-P01",
          team_name: "Legal Eagles",
          university: "University of Colombo",
          participants: [
            { name: "Amara Silva", role: "Lead Counsel" },
            { name: "Kasun Perera", role: "Co-Counsel" },
          ]
        },
        respondent_team: {
          team_code: "JQ2025-P08",
          team_name: "Judicial Jaguars",
          university: "Eastern University",
          participants: [
            { name: "Mohamed Rishad", role: "Lead Counsel" },
            { name: "Fatima Nazreen", role: "Co-Counsel" },
          ]
        },
        judges: [
          { name: "Dr. Rohan Samarajiva", title: "Senior Attorney-at-Law" },
        ],
        case_details: {
          case_title: "Sample Case A",
          case_number: "PR2025/001",
          time_limit: "30 minutes per side"
        },
        winner: "JQ2025-P01",
        final_scores: {
          applicant: 85.5,
          respondent: 78.2
        }
      },
      {
        match_id: "P1-002",
        court_room: "Court B",
        time: "09:00",
        status: "completed",
        applicant_team: {
          team_code: "JQ2025-P02",
          team_name: "Justice Warriors",
          university: "University of Peradeniya",
          participants: [
            { name: "Dilshan Wickramasinghe", role: "Lead Counsel" },
            { name: "Priya Kumari", role: "Co-Counsel" },
          ]
        },
        respondent_team: {
          team_code: "JQ2025-P07",
          team_name: "Verdict Vanguards",
          university: "University of Sri Jayewardenepura",
          participants: [
            { name: "Hasitha Amarasinghe", role: "Lead Counsel" },
            { name: "Tharushi Pathirana", role: "Co-Counsel" },
          ]
        },
        judges: [
          { name: "Ms. Manisha Gunasekera", title: "President's Counsel" },
        ],
        case_details: {
          case_title: "Sample Case B",
          case_number: "PR2025/002",
          time_limit: "30 minutes per side"
        },
        winner: "JQ2025-P02",
        final_scores: {
          applicant: 83.8,
          respondent: 79.6
        }
      },
      // ... more matches for Round 1
    ]
  },
  {
    round_number: 2,
    date: "2025-09-21",
    matches: [
      {
        match_id: "P2-001",
        court_room: "Court A",
        time: "10:00",
        status: "scheduled",
        applicant_team: {
          team_code: "JQ2025-P03",
          team_name: "Moot Masters",
          university: "University of Kelaniya",
          participants: [
            { name: "Thilini Jayawardena", role: "Lead Counsel" },
            { name: "Ruwan Senanayake", role: "Co-Counsel" },
          ]
        },
        respondent_team: {
          team_code: "JQ2025-P06",
          team_name: "Law Legends",
          university: "University of Moratuwa",
          participants: [
            { name: "Dilan Ratnayake", role: "Lead Counsel" },
            { name: "Sanduni Weerasinghe", role: "Co-Counsel" },
          ]
        },
        judges: [
          { name: "Mr. Romesh de Silva", title: "President's Counsel" },
        ],
        case_details: {
          case_title: "Sample Case C",
          case_number: "PR2025/003",
          time_limit: "30 minutes per side"
        },
      },
      // ... more matches for Round 2
    ]
  },
  // ... more rounds
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

const PreliminaryRounds = () => {
  const [expandedMatches, setExpandedMatches] = useState({}) // Object to track expanded matches by ID

  const toggleMatchDetails = (matchId) => {
    setExpandedMatches(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Preliminary Rounds</h1>
        <p className="text-lg opacity-90">Jessup Moot Court Competition 2025</p>
        <p className="text-sm opacity-75">September 20 - 24, 2025</p>
      </div>

      {/* Stats (Optional, adjust based on available data) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Users className="h-6 w-6 text-blue-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-blue-900">32</p>
            <p className="text-xs text-blue-700">Teams</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Gavel className="h-6 w-6 text-green-600 mx-auto mb-2" />
            <p className="text-xl font-bold text-green-900">16</p>
            <p className="text-xs text-green-700">Rounds</p>
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
            <p className="text-xl font-bold text-orange-900">20+</p>
            <p className="text-xs text-orange-700">Judges</p>
          </CardContent>
        </Card>
      </div>

      {/* Rounds */}
      <div className="space-y-10">
        {preliminaryRoundsData.map((round) => (
          <div key={round.round_number} className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 border-b pb-2">
              Round {round.round_number} - {formatDate(round.date)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {round.matches.map((match) => (
                <Card
                  key={match.match_id}
                  className={`shadow-sm transition-all duration-300 ${
                    expandedMatches[match.match_id] ? 'ring-2 ring-[#2d4817] shadow-lg' : 'hover:shadow-md'
                  }`}
                >
                  <CardContent className="p-6">
                    {/* Match Header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">Match {match.match_id.split('-')[1]}</h3>
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
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{match.applicant_team.team_name}</p>
                          <p className="text-xs text-gray-600">{match.applicant_team.university}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-blue-600">Applicant</p>
                          {match.status === 'completed' && match.final_scores && (
                            <p className="text-xs text-gray-600">Score: {match.final_scores.applicant}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <span className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-600">VS</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{match.respondent_team.team_name}</p>
                          <p className="text-xs text-gray-600">{match.respondent_team.university}</p>
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

                    {/* Expand Button */}
                    <button
                      onClick={() => toggleMatchDetails(match.match_id)}
                      className="mt-4 w-full py-2 text-sm font-medium text-[#2d4817] hover:bg-gray-50 rounded-md border border-gray-200"
                    >
                      {expandedMatches[match.match_id] ? 'Hide Details' : 'Show Details'}
                    </button>

                    {/* Expanded Details */}
                    {expandedMatches[match.match_id] && (
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
          </div>
        ))}
      </div>
    </div>
  )
}

export default PreliminaryRounds
