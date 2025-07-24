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

import Overview from "@/components/JuriDashboard/Overview"
import MemorialUpload from "@/components/JuriDashboard/Marks"
import AnnouncementFeed from "@/components/JuriDashboard/AnnouncementFeed"
import Team from "@/components/JuriDashboard/Team"
import Mark from "@/components/JuriDashboard/Marks"
import Memorial from "@/components/JuriDashboard/Memorial"
import RoundDetails from "@/components/JuriDashboard/RoundDetails"
import Sidebar from "@/components/JuriDashboard/sidebar"
import AllTeams from "@/components/JuriDashboard/AllTeams"
import QuarterFinal from "@/components/JuriDashboard/QuarterFinal"
import Prelims from "@/components/JuriDashboard/Prelims"
import SemiFinal from "@/components/JuriDashboard/SemiFinal"
import Final from "@/components/JuriDashboard/Final"
import DashboardSkeleton from "./DashboardSkeleton"

// Mock data for demo purposes
const mockOverviewData = {
  team_details: {
    team_code: "TC123",
    team_name: "Justice League",
    university: "Example University",
    participants: [
      { name: "Alice Smith" },
      { name: "Bob Johnson" },
      { name: "Carol Williams" },
    ],
  },
  competition_progress: {
    total_teams: 50,
    qualified_for_round_2: 25,
    rounds_completed: 1,
  },
  upcoming_deadline: {
    title: "Memorial Submission",
    deadline: "2025-08-10T23:59:59",
  },
}

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [overviewData] = useState(mockOverviewData)

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
              <Overview overviewData={overviewData} />
            </TabsContent>

            <TabsContent value="all-teams">
              <AllTeams />
            </TabsContent>

            <TabsContent value="quarter-final">
              <QuarterFinal />
            </TabsContent>
            <TabsContent value="teams">
              <Prelims />
            </TabsContent>
            <TabsContent value="semi-final">
              <SemiFinal />
            </TabsContent>
            <TabsContent value="final">
              <Final />
            </TabsContent>

            

            <TabsContent value="marks">
              <Mark teamCode={overviewData?.team_details?.team_code} />
            </TabsContent>

            <TabsContent value="announcement">
              <AnnouncementFeed />
            </TabsContent>

            <TabsContent value="team">
              <Team/>
            </TabsContent>

            <TabsContent value="memorial">
              <Memorial/>
            </TabsContent>

            <TabsContent value="round-details">
              <RoundDetails />
            </TabsContent>

          </div>
        </main>
      </div>
    </Tabs>
  )
}

export default Dashboard
