
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Users, ExternalLink, Trophy } from "lucide-react";

const RoundDetails = () => {
  const rounds = [
    {
      round: "Preliminary Round 1",
      date: "December 10, 2024",
      time: "10:00 AM - 11:30 AM",
      venue: "Virtual Court Room A",
      judge: "Hon. Justice Sarah Miller",
      opponent: "Team DEF456 - Legal Warriors",
      opponentUniversity: "State University Law School",
      status: "upcoming",
      joinLink: "https://zoom.us/j/123456789",
      side: "Petitioner"
    },
    {
      round: "Preliminary Round 2",
      date: "December 12, 2024",
      time: "2:00 PM - 3:30 PM",
      venue: "Virtual Court Room B",
      judge: "Hon. Justice David Chen",
      opponent: "Team GHI789 - Justice League",
      opponentUniversity: "Metropolitan Law College",
      status: "scheduled",
      joinLink: "https://zoom.us/j/987654321",
      side: "Respondent"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      case "scheduled": return "bg-blue-100 text-blue-700 border-blue-200";
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-purple-500" />
          Round Details & Schedule
        </CardTitle>
        <CardDescription>
          Your upcoming rounds, opponents, and hearing details
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {rounds.map((round, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{round.round}</h3>
                  <Badge className={getStatusColor(round.status)}>
                    {round.status.toUpperCase()}
                  </Badge>
                </div>
                <Badge variant="outline" className={`${round.side === "Petitioner" ? "border-blue-200 text-blue-700" : "border-green-200 text-green-700"}`}>
                  {round.side}
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Date:</span>
                    <span>{round.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Time:</span>
                    <span>{round.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Venue:</span>
                    <span>{round.venue}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="font-medium">Judge:</span>
                    <span>{round.judge}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-1">Opponent Team:</p>
                    <p className="text-sm text-gray-900">{round.opponent}</p>
                    <p className="text-xs text-gray-600">{round.opponentUniversity}</p>
                  </div>
                  
                  {round.status === "upcoming" && (
                    <div className="mt-4">
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600 text-white"
                        onClick={() => window.open(round.joinLink, '_blank')}
                      >
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Join Virtual Courtroom
                      </Button>
                      <p className="text-xs text-gray-500 mt-2 text-center">
                        Link will be active 15 minutes before the hearing
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Competition Bracket Info */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-2">Competition Progress</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">32</div>
              <div className="text-sm text-blue-700">Total Teams</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-600">16</div>
              <div className="text-sm text-green-700">Qualified for Round 2</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-600">2</div>
              <div className="text-sm text-purple-700">Rounds Completed</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RoundDetails;
