"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, User, ExternalLink } from "lucide-react"

const RoundDetails = () => {
  // Mock data for the current round
  const currentRound = {
    round: "Preliminary Round 1",
    date: "December 10, 2024",
    time: "10:00 AM - 11:30 AM",
    venue: "Virtual Court Room A",
    judge: "Hon. Justice Sarah Miller",
    opponent: "Team DEF456 - Legal Warriors",
    opponentSchool: "State University Law School",
    status: "upcoming",
  }

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">Round Details</h1>
        <p className="text-gray-500 mt-1 mb-6">Your upcoming rounds, opponents, and hearing details</p>

        {/* Main Content */}
        <Card className="mt-0">
          <CardContent className="space-y-6 p-6">
            {/* Round Title and Status */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold text-gray-900">{currentRound.round}</h2>
              <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border border-orange-200">
                {currentRound.status}
              </Badge>
            </div>
            {/* Grid Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Event Details */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Calendar className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Date:</span> {currentRound.date}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Clock className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Time:</span> {currentRound.time}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <MapPin className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Venue:</span> {currentRound.venue}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-500" />
                  <div>
                    <p className="text-gray-600">
                      <span className="font-medium text-gray-700">Judge:</span> {currentRound.judge}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Opponent Details */}
              <div>
                <h3 className="font-medium text-gray-700 mb-2 text-right">Opponent Team</h3>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{currentRound.opponent}</p>
                  <p className="text-gray-600 text-sm mt-1">{currentRound.opponentSchool}</p>
                </div>
              </div>
            </div>
            {/* Action Button */}
            <div className="pt-4">
              <button className="w-full bg-[#2d4817] hover:bg-[#2a4015] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2">
                <ExternalLink className="h-4 w-4" />
                Join Virtual Courtrooms
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RoundDetails
