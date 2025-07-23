"use client"

import { useState, useEffect } from "react"
import axios from "axios";
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

import Overview from "@/components/JuriDashboard/Overview";
import MemorialUpload from "@/components/JuriDashboard/MemorialUpload"
import ClarificationPanel from "@/components/JuriDashboard/ClarificationPanel"
import AnnouncementFeed from "@/components/JuriDashboard/AnnouncementFeed"
import DownloadCenter from "@/components/JuriDashboard/DownloadCenter"
import RoundDetails from "@/components/JuriDashboard/RoundDetails"

import Sidebar from "@/components/JuriDashboard/sidebar";

import ContactPage from "@/components/JuriDashboard/ContactPage"
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          // Handle case where user is not logged in
          setError("Not authenticated");
          setLoading(false);
          return;
        }
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/overview/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOverviewData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOverviewData();
  }, []);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
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

            <TabsContent value="downloads">
              <DownloadCenter />
            </TabsContent>

            <TabsContent value="memorial">
              <MemorialUpload teamCode={overviewData?.team_details?.team_code} />
            </TabsContent>

            <TabsContent value="clarifications">
              <ClarificationPanel teamCode={overviewData?.team_details?.team_code} />
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