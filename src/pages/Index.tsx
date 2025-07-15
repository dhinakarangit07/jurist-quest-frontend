
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Download, 
  Upload, 
  MessageSquare, 
  Bell, 
  Calendar, 
  Users, 
  Trophy,
  Clock,
  FileText,
  MessageCircle,
  Phone,
  ExternalLink,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import LoginForm from "@/components/LoginForm";
import CountdownTimer from "@/components/CountdownTimer";
import WelcomeMessage from "@/components/WelcomeMessage";
import MemorialUpload from "@/components/MemorialUpload";
import ClarificationPanel from "@/components/ClarificationPanel";
import AnnouncementFeed from "@/components/AnnouncementFeed";
import DownloadCenter from "@/components/DownloadCenter";
import RoundDetails from "@/components/RoundDetails";

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teamData, setTeamData] = useState({
    teamCode: "",
    teamName: "",
    university: "",
    participants: []
  });

  // Mock data for demonstration
  const competitionDate = new Date("2024-12-15T09:00:00");
  const upcomingRounds = [
    { 
      round: "Preliminary Round 1", 
      date: "2024-12-10T10:00:00", 
      venue: "Virtual Court Room A",
      opponent: "Team DEF456",
      status: "upcoming"
    },
    { 
      round: "Memorial Submission", 
      date: "2024-12-08T23:59:59", 
      venue: "Online Portal", 
      status: "urgent"
    }
  ];

  const handleLogin = (data: any) => {
    setTeamData(data);
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Moot Court Competition</h1>
                <p className="text-sm text-gray-600">Dashboard Portal</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <CountdownTimer targetDate={competitionDate} />
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsLoggedIn(false)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Welcome Section */}
        <div className="mb-8">
          <WelcomeMessage teamData={teamData} />
        </div>

        {/* Urgent Alerts */}
        <div className="mb-6">
          <Alert className="border-yellow-200 bg-yellow-50">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertTitle className="text-yellow-800">Upcoming Deadline</AlertTitle>
            <AlertDescription className="text-yellow-700">
              Memorial submission deadline is in 2 days (Dec 8, 11:59 PM)
            </AlertDescription>
          </Alert>
        </div>

        {/* Main Dashboard */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-6 bg-white/50">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="downloads" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Downloads</span>
            </TabsTrigger>
            <TabsTrigger value="memorial" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              <span className="hidden sm:inline">Memorial</span>
            </TabsTrigger>
            <TabsTrigger value="clarifications" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span className="hidden sm:inline">Clarifications</span>
            </TabsTrigger>
            <TabsTrigger value="announcements" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Announcements</span>
            </TabsTrigger>
            <TabsTrigger value="support" className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span className="hidden sm:inline">Support</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    Upcoming Events
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingRounds.map((round, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h4 className="font-semibold text-gray-900">{round.round}</h4>
                          <p className="text-sm text-gray-600">{round.venue}</p>
                          {round.opponent && (
                            <p className="text-sm text-blue-600">vs {round.opponent}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge 
                            variant={round.status === "urgent" ? "destructive" : "secondary"}
                            className={round.status === "urgent" ? "bg-red-100 text-red-700" : ""}
                          >
                            {new Date(round.date).toLocaleDateString()}
                          </Badge>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(round.date).toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-500" />
                    Team Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Team Code</p>
                    <p className="text-lg font-bold text-green-600">{teamData.teamCode}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">University</p>
                    <p className="text-sm text-gray-900">{teamData.university}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">Participants</p>
                    <div className="space-y-1">
                      {teamData.participants.map((participant: string, index: number) => (
                        <p key={index} className="text-sm text-gray-900">{participant}</p>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="mt-6">
              <RoundDetails />
            </div>
          </TabsContent>

          <TabsContent value="downloads">
            <DownloadCenter />
          </TabsContent>

          <TabsContent value="memorial">
            <MemorialUpload teamCode={teamData.teamCode} />
          </TabsContent>

          <TabsContent value="clarifications">
            <ClarificationPanel teamCode={teamData.teamCode} />
          </TabsContent>

          <TabsContent value="announcements">
            <AnnouncementFeed />
          </TabsContent>

          <TabsContent value="support">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-blue-500" />
                    Helpdesk Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Technical Support</p>
                      <p className="text-sm text-gray-600">Platform & Upload Issues</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Call
                    </Button>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Competition Queries</p>
                      <p className="text-sm text-gray-600">Rules & Procedures</p>
                    </div>
                    <Button size="sm" variant="outline">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-green-500" />
                    WhatsApp Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    General Updates Group
                  </Button>
                  <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Technical Support Group
                  </Button>
                  <p className="text-xs text-gray-500 text-center">
                    Click to join WhatsApp groups for instant updates
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
