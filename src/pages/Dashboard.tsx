"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Download,
  Upload,
  MessageSquare,
  Bell,
  Calendar,
  Users,
  Trophy,
  MessageCircle,
  Phone,
  ExternalLink,
  AlertTriangle,
} from "lucide-react"
import CountdownTimer from "@/components/CountdownTimer"
import Overview from "./Overview";
import MemorialUpload from "@/components/MemorialUpload"
import ClarificationPanel from "@/components/ClarificationPanel"
import AnnouncementFeed from "@/components/AnnouncementFeed"
import DownloadCenter from "@/components/DownloadCenter"
import RoundDetails from "@/components/RoundDetails"

import Sidebar from "@/components/sidebar";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [teamData] = useState({
    teamCode: "ABC123",
    teamName: "The Legal Eagles",
    university: "University of Law",
    participants: ["John Doe", "Jane Smith", "Peter Jones"],
  })

  // Mock data for demonstration
  const competitionDate = new Date("2024-12-15T09:00:00")
  const upcomingRounds = [
    {
      round: "Preliminary Round 1",
      date: "2024-12-10T10:00:00",
      venue: "Virtual Court Room A",
      opponent: "Team DEF456",
      status: "upcoming",
    },
    {
      round: "Memorial Submission",
      date: "2024-12-08T23:59:59",
      venue: "Online Portal",
      status: "urgent",
    },
  ]

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <Tabs defaultValue="overview">
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-white flex">
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <main className="flex-1">

          <div className="container mx-auto px-4 py-6">
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

            <TabsContent value="overview">
              <Overview teamData={teamData} upcomingRounds={upcomingRounds} />
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
                    <Button className="w-full bg-green-800 hover:bg-green-600 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      General Updates Group
                    </Button>
                    <Button className="w-full bg-green-800 hover:bg-green-600 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Technical Support Group
                    </Button>
                    <p className="text-xs text-gray-500 text-center">Click to join WhatsApp groups for instant updates</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </div>
        </main>
      </div>
    </Tabs>
  )
}

export default Dashboard