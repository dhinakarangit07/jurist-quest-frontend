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
  Menu,
} from "lucide-react"
import CountdownTimer from "@/components/CountdownTimer"
import Overview from "./Overview";
import MemorialUpload from "@/components/MemorialUpload"
import ClarificationPanel from "@/components/ClarificationPanel"
import AnnouncementFeed from "@/components/AnnouncementFeed"
import DownloadCenter from "@/components/DownloadCenter"
import RoundDetails from "@/components/RoundDetails"

import Sidebar from "@/components/sidebar";

import ContactPage from "@/components/ContactPage"

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
        
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={toggleSidebar}
          ></div>
        )}

        <main className="flex-1 lg:ml-64">
          <div className="flex items-center justify-between p-4 border-b lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <Menu className="h-6 w-6" />
            </Button>
            <h1 className="text-lg font-semibold">Moot Court Central</h1>
          </div>

          <div className="container mx-auto px-4 py-6">
            
            

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

            <TabsContent value="round-details">
              <RoundDetails />
            </TabsContent>

            <TabsContent value="support">
              <ContactPage />
            </TabsContent>
          </div>
        </main>
      </div>
    </Tabs>
  )
}

export default Dashboard