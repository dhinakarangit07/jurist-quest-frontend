import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, Trophy, School, Clock, MapPin, ExternalLink, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Overview = ({ teamData, upcomingRounds }) => {
  // Sample data to match the design
  const sampleTeamData = {
    teamCode: "ABC123",
    teamName: "Legal Eagles",
    university: "University of Excellence",
    participants: ["John Doe", "Jane Smith", "Mike Taylor"]
  };

  const actualTeamData = teamData || sampleTeamData;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <Card className="bg-gradient-to-r from-green-700 to-green-800 text-white border-0">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-4">Welcome Back!</h1>
              <p className="text-green-100 mb-4">
                Utilize this space to add Add some Description here or more Information about the competition or welcome description
              </p>
              
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-3">Your Competition Progress</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">32</div>
                        <div className="text-xs text-green-200">Total Teams</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">16</div>
                        <div className="text-xs text-green-200">Qualified for Round 2</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="text-lg font-bold">2</div>
                        <div className="text-xs text-green-200">Rounds Completed</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center md:text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4">
                <p className="text-green-100 text-sm mb-1">Competition starts in</p>
                <div className="text-4xl font-bold mb-1">7</div>
                <p className="text-sm text-green-200">DAYS</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Deadline Alert */}
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <div>
              <h3 className="font-semibold text-red-800">Upcoming Deadline</h3>
              <p className="text-sm text-red-600">
                Memorial submission deadline is in 2 days (Dec 8, 11:59 PM)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Information and University */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Users className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Team</h3>
                <p className="text-sm text-gray-600">{actualTeamData.teamCode} ({actualTeamData.teamName})</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <School className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">University</h3>
                <p className="text-sm text-gray-600">{actualTeamData.university}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-3">Team Members</h3>
              <div className="flex -space-x-2">
                {actualTeamData.participants.map((participant, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white"
                    title={participant}
                  >
                    {participant.split(' ').map(n => n[0]).join('')}
                  </div>
                ))}
              </div>
              <div className="mt-3 space-y-1">
                {actualTeamData.participants.map((participant, index) => (
                  <p key={index} className="text-xs text-gray-600">
                    {participant}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;