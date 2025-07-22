"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Eye, ChevronLeft } from "lucide-react";
import useRounds from "@/hooks/useRounds";
import RoundDetailsSkeleton from "./RoundDetailsSkeleton";

const RoundDetails = () => {
  const { rounds, isLoading, error } = useRounds();
  const [teamData, setTeamData] = useState(null);
  const [selectedRound, setSelectedRound] = useState(null);

  useEffect(() => {
    const storedTeamData = localStorage.getItem("team_data");
    if (storedTeamData) {
      setTeamData(JSON.parse(storedTeamData));
    }
  }, []);

  if (isLoading) {
    return <RoundDetailsSkeleton />;
  }

  if (error) {
    return <div className="text-red-500 p-6">Error: {error.message}</div>;
  }

  if (!rounds || rounds.length === 0) {
    return <div className="text-gray-500 p-6">No rounds found.</div>;
  }

  const handleViewDetails = (round) => {
    setSelectedRound(round);
  };

  const handleCloseDetails = () => {
    setSelectedRound(null);
  };

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
            Back to all rounds
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Round Details</h1>
          <p className="text-gray-600 mt-2">Your upcoming rounds, opponents, and hearing details</p>
        </div>

        {/* Main Content */}
        {!selectedRound ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rounds.map((round, idx) => (
              <Card
                key={round.id || idx}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
              >
                <CardContent className="p-6">
                  {/* Round Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{round.round_name}</h2>
                      <Badge
                        variant="outline"
                        className={`mt-2 ${
                          round.status === "Upcoming"
                            ? "bg-blue-50 text-blue-700 border-blue-200"
                            : round.status === "Ongoing"
                            ? "bg-orange-50 text-orange-700 border-orange-200"
                            : "bg-green-50 text-green-700 border-green-200"
                        }`}
                      >
                        {round.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Round {idx + 1}</p>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                          <Calendar className="h-5 w-5 text-[#2d4817]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Date & Time</p>
                          <p className="text-gray-900">
                            {round.date} • {round.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                          <MapPin className="h-5 w-5 text-[#2d4817]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Venue</p>
                          <p className="text-gray-900">{round.venue}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-[#2d4817]/10 rounded-lg">
                          <User className="h-5 w-5 text-[#2d4817]" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Judge</p>
                          <p className="text-gray-900">{round.judge}</p>
                        </div>
                      </div>
                    </div>

                    {/* Teams Preview */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                      <h3 className="text-sm font-medium text-gray-500 mb-3">Teams</h3>
                      <div className="flex items-center justify-between">
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{round.team1?.team_id}</p>
                          <p className="text-xs text-gray-500 mt-1">{round.team1?.institution_name}</p>
                        </div>
                        <div className="px-4 py-1 bg-gray-100 rounded-full text-xs font-medium text-gray-700">
                          VS
                        </div>
                        <div className="text-center">
                          <p className="font-semibold text-gray-900">{round.team2?.team_id}</p>
                          <p className="text-xs text-gray-500 mt-1">{round.team2?.institution_name}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleViewDetails(round)}
                    className="w-full bg-[#2d4817] hover:bg-[#233a12] text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <Eye className="h-4 w-4" />
                    View Full Details
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Detailed View */}
            <Card className="border border-gray-200 rounded-xl shadow-sm overflow-hidden">
              <CardContent className="p-0">
                {/* Round Header */}
                <div className="bg-[#2d4817] text-white p-6">
                  <h2 className="text-2xl font-bold mb-1">{selectedRound.round_name}</h2>
                  <div className="flex items-center gap-4">
                    <Badge
                      variant="outline"
                      className={
                        selectedRound.status === "Upcoming"
                          ? "bg-blue-100/20 text-blue-100 border-blue-100/30"
                          : selectedRound.status === "Ongoing"
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
                      <MapPin className="h-4 w-4" />
                      <span>{selectedRound.venue}</span>
                    </div>
                  </div>
                </div>

                {/* VS Battle Layout */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                  {/* Team 1 - Left Side */}
                  <div className={`p-8 ${
                    selectedRound.team1?.id === teamData?.id
                      ? "bg-[#2d4817]/5 border-t-2 border-[#2d4817]"
                      : "bg-white"
                  }`}>
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3 className={`text-xl font-bold ${
                        selectedRound.team1?.id === teamData?.id
                          ? "text-[#2d4817]"
                          : "text-gray-900"
                      }`}>
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
                          {selectedRound.team1?.speaker_1_name} <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_1_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team1?.speaker_2_name} <span className="text-gray-500 text-sm">({selectedRound.team1?.speaker_2_course_type})</span>
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
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-[#2d4817] flex items-center justify-center text-white text-xl font-bold shadow-lg">
                        VS
                      </div>
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center text-sm text-gray-500 mt-2 w-full">
                        <p>Judge:</p>
                        <p className="font-medium text-gray-900">{selectedRound.judge}</p>
                      </div>
                    </div>
                  </div>

                  {/* Team 2 - Right Side */}
                  <div className={`p-8 ${
                    selectedRound.team2?.id === teamData?.id
                      ? "bg-[#2d4817]/5 border-t-2 border-[#2d4817]"
                      : "bg-white"
                  }`}>
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-20 h-20 rounded-full bg-[#2d4817]/10 flex items-center justify-center mb-3">
                        <User className="h-8 w-8 text-[#2d4817]" />
                      </div>
                      <h3 className={`text-xl font-bold ${
                        selectedRound.team2?.id === teamData?.id
                          ? "text-[#2d4817]"
                          : "text-gray-900"
                      }`}>
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
                          {selectedRound.team2?.speaker_1_name} <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_1_course_type})</span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Speaker 2</p>
                        <p className="text-gray-900">
                          {selectedRound.team2?.speaker_2_name} <span className="text-gray-500 text-sm">({selectedRound.team2?.speaker_2_course_type})</span>
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
  );
};

export default RoundDetails;
