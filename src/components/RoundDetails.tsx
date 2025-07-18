"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

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
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg text-gray-600 font-normal">
            Round Details
          </CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            Your upcoming rounds, opponents, and hearing details
          </p>
        </CardHeader>
      </Card>

      {/* Main Content */}
      <Card className="mt-6">
        <CardContent className="space-y-6">
          {/* Round Title and Status */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{currentRound.round}</h2>
            <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-100">
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
                  <p className="font-medium text-gray-700">Date:</p>
                  <p className="text-gray-600">{currentRound.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Time:</p>
                  <p className="text-gray-600">{currentRound.time}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Venue:</p>
                  <p className="text-gray-600">{currentRound.venue}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-700">Judge:</p>
                  <p className="text-gray-600">{currentRound.judge}</p>
                </div>
              </div>
            </div>

            {/* Right Column - Opponent Details */}
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Opponent Team</h3>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{currentRound.opponent}</p>
                <p className="text-gray-600 text-sm mt-1">{currentRound.opponentSchool}</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-4">
            <button
              className="w-full bg-[#2d4817] hover:bg-[#2a4015] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <MapPin className="h-4 w-4" />
              Join Virtual Courtrooms
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RoundDetails;
