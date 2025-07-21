
"use client";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, User, Eye } from "lucide-react";
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
    return <div>Error: {error.message}</div>;
  }

  if (!rounds || rounds.length === 0) {
    return <div>No rounds found.</div>;
  }

  const handleViewDetails = (round) => {
    setSelectedRound(round);
  };

  const handleCloseDetails = () => {
    setSelectedRound(null);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-900">Round Details</h1>
        <p className="text-gray-500 mt-1 mb-6">Your upcoming rounds, opponents, and hearing details</p>

        {/* Main Content - All Rounds */}
        {!selectedRound ? (
          <div className="space-y-8">
            {rounds.map((round, idx) => (
              <Card className="mt-0" key={round.id || idx}>
                <CardContent className="space-y-6 p-6">
                  {/* Round Title and Status */}
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{round.round_name}</h2>
                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100 border border-orange-200">
                      {round.status}
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
                            <span className="font-medium text-gray-700">Date:</span> {round.date}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-700">Time:</span> {round.time}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-700">Venue:</span> {round.venue}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-gray-500" />
                        <div>
                          <p className="text-gray-600">
                            <span className="font-medium text-gray-700">Judge:</span> {round.judge}
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Right Column - Team Preview */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2 text-right">Teams</h3>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{round.team1?.team_id} vs {round.team2?.team_id}</p>
                        <p className="text-gray-600 text-sm mt-1">{round.team1?.institution_name} vs {round.team2?.institution_name}</p>
                      </div>
                    </div>
                  </div>
                  {/* Action Button */}
                  <div className="pt-4">
                    <button
                      onClick={() => handleViewDetails(round)}
                      aria-label={`View details for ${round.round_name}`}
                      className="w-full bg-[#2d4817] hover:bg-[#2a4015] text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Details
                    </button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {/* Back Button */}
            <button
              onClick={handleCloseDetails}
              className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2 mb-4"
            >
              ← Back to Rounds
            </button>
            {/* Detailed View */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedRound.round_name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Team 1 Details */}
                  <div>
                    <h3 className={`font-medium mb-2 ${selectedRound.team1?.id === teamData?.id ? 'text-green-600' : 'text-gray-700'}`}>
                      Team 1
                    </h3>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedRound.team1?.team_id}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Institution:</span> {selectedRound.team1?.institution_name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Representative:</span> {selectedRound.team1?.team_representative_name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Speaker 1:</span> {selectedRound.team1?.speaker_1_name} ({selectedRound.team1?.speaker_1_course_type})
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Speaker 2:</span> {selectedRound.team1?.speaker_2_name} ({selectedRound.team1?.speaker_2_course_type})
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Researcher:</span> {selectedRound.team1?.researcher_name}
                      </p>
                    </div>
                  </div>
                  {/* Versus Animation */}
                  <div className="flex items-center justify-center">
                    <span className="text-4xl font-bold text-gray-900 animate-pulse">VS</span>
                  </div>
                  {/* Team 2 Details */}
                  <div>
                    <h3 className={`font-medium mb-2 ${selectedRound.team2?.id === teamData?.id ? 'text-green-600' : 'text-gray-700'}`}>
                      Team 2
                    </h3>
                    <div>
                      <p className="font-semibold text-gray-900">{selectedRound.team2?.team_id}</p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Institution:</span> {selectedRound.team2?.institution_name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Representative:</span> {selectedRound.team2?.team_representative_name}
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Speaker 1:</span> {selectedRound.team2?.speaker_1_name} ({selectedRound.team2?.speaker_1_course_type})
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Speaker 2:</span> {selectedRound.team2?.speaker_2_name} ({selectedRound.team2?.speaker_2_course_type})
                      </p>
                      <p className="text-gray-600 text-sm mt-1">
                        <span className="font-medium">Researcher:</span> {selectedRound.team2?.researcher_name}
                      </p>
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
