
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, Clock, ExternalLink, Megaphone, Trophy } from "lucide-react";

const AnnouncementFeed = () => {
  const announcements = [
    {
      id: 1,
      title: "Round 1 Schedule Released",
      content: "The preliminary round 1 schedule has been published. Please check your assigned time slots and courtroom details.",
      type: "schedule",
      priority: "high",
      timestamp: "2024-12-05 16:30",
      hasLink: true,
      linkText: "View Schedule"
    },
    {
      id: 2,
      title: "Virtual Hearing Platform Update",
      content: "We will be using Zoom for all virtual hearings. Please ensure you have the latest version installed and test your audio/video before your rounds.",
      type: "technical",
      priority: "medium",
      timestamp: "2024-12-05 14:20",
      hasLink: true,
      linkText: "Join Test Room"
    },
    {
      id: 3,
      title: "Memorial Submission Reminder",
      content: "Reminder: Memorial submissions are due December 8, 2024 at 11:59 PM. Late submissions will not be accepted.",
      type: "deadline",
      priority: "urgent",
      timestamp: "2024-12-05 09:00",
      hasLink: false
    },
    {
      id: 4,
      title: "Winners of Practice Round",
      content: "Congratulations to the teams that excelled in the practice rounds. Results have been published on the results portal.",
      type: "results",
      priority: "low",
      timestamp: "2024-12-04 18:45",
      hasLink: true,
      linkText: "View Results"
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case "schedule": return <Calendar className="h-4 w-4" />;
      case "technical": return <Clock className="h-4 w-4" />;
      case "deadline": return <Bell className="h-4 w-4" />;
      case "results": return <Trophy className="h-4 w-4" />;
      default: return <Megaphone className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-100 text-red-700 border-red-200";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200";
      case "medium": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-green-100 text-green-700 border-green-200";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-500" />
            Competition Announcements
          </CardTitle>
          <CardDescription>
            Stay updated with the latest competition news and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((announcement) => (
              <div key={announcement.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getIcon(announcement.type)}
                    <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getPriorityColor(announcement.priority)}>
                      {announcement.priority}
                    </Badge>
                    <span className="text-xs text-gray-500">{announcement.timestamp}</span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-700 mb-3">{announcement.content}</p>
                
                {announcement.hasLink && (
                  <Button size="sm" variant="outline" className="text-blue-600 border-blue-200 hover:bg-blue-50">
                    <ExternalLink className="h-3 w-3 mr-1" />
                    {announcement.linkText}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
            <h4 className="font-semibold text-blue-700">Round Schedule</h4>
            <p className="text-sm text-blue-600 mb-3">View complete competition schedule</p>
            <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
              View Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <h4 className="font-semibold text-green-700">Results Portal</h4>
            <p className="text-sm text-green-600 mb-3">Check latest round results</p>
            <Button size="sm" className="bg-green-500 hover:bg-green-600">
              View Results
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <ExternalLink className="h-8 w-8 text-purple-500 mx-auto mb-2" />
            <h4 className="font-semibold text-purple-700">Virtual Links</h4>
            <p className="text-sm text-purple-600 mb-3">Access courtroom links</p>
            <Button size="sm" className="bg-purple-500 hover:bg-purple-600">
              Get Links
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnnouncementFeed;
