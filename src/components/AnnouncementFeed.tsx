import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, ExternalLink, Megaphone, Trophy } from "lucide-react";

const AnnouncementFeed = () => {
  const announcements = [
    {
      id: 1,
      name: "Round 1 Schedule",
      description: "The preliminary round 1 schedule has been published. Please check your assigned time slots and courtroom details",
      dateTime: "2024-12-05 16:30",
      hasLink: true,
      linkText: "View Schedule"
    },
    {
      id: 2,
      name: "Round 1 Schedule",
      description: "The preliminary round 1 schedule has been published. Please check your assigned time slots and courtroom details",
      dateTime: "2024-12-05 16:30",
      hasLink: true,
      linkText: "View Schedule"
    },
    {
      id: 3,
      name: "Round 1 Schedule",
      description: "The preliminary round 1 schedule has been published. Please check your assigned time slots and courtroom details",
      dateTime: "2024-12-05 16:30",
      hasLink: true,
      linkText: "View Schedule"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Quick Actions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Upcoming Rounds</h4>
            <p className="text-sm text-gray-600 mb-4">View complete schedule of the competition</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Rounds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
            <p className="text-sm text-gray-600 mb-4">Check latest results</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Results
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Megaphone className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Court Hall Allotment</h4>
            <p className="text-sm text-gray-600 mb-4">Access courtroom links</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Court Hall
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Competition Announcements */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Competition Announcements
          </CardTitle>
          <CardDescription className="text-gray-600">
            Stay updated with the latest competition news and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date & Time</th>
                  <th className="text-right py-3 px-4 font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((announcement) => (
                  <tr key={announcement.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="font-medium text-gray-900">
                        {announcement.name}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-700 max-w-md">
                        {announcement.description}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="text-sm text-gray-600">
                        {new Date(announcement.dateTime).toLocaleString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                        </div>
                      </td>
                    <td className="py-4 px-4 text-right">
                      {announcement.hasLink && (
                        <Button 
                          size="sm" 
                          className="bg-[#2d4817] hover:bg-[#2a4015] text-white flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3 mr-1" />
                          {announcement.linkText}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementFeed;
