"use client"

import {
  Download,
  Upload,
  MessageSquare,
  Bell,
  Phone,
  Trophy,
  LayoutDashboard,
  LogOut,
} from "lucide-react"
import { TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SidebarProps {
  isSidebarOpen: boolean
  toggleSidebar: () => void
}

const Sidebar = ({ isSidebarOpen, toggleSidebar }: SidebarProps) => {
  return (
    <aside className={`w-64 bg-white border-r border-gray-200 flex flex-col transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static absolute inset-y-0 left-0 z-50`}>
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">JuristQuest</h1>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <TabsList className="grid grid-cols-1 h-auto bg-transparent space-y-2 p-0">
          {/* Dashboard - Featured Button */}
          <TabsTrigger 
            value="overview" 
            className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-green-800 data-[state=active]:text-white font-medium"
          >
            <LayoutDashboard className="h-5 w-5" />
            <span>Dashboard</span>
          </TabsTrigger>

          {/* Regular Menu Items */}
          <TabsTrigger 
            value="downloads" 
            className="w-full bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 border-none"
          >
            <Download className="h-5 w-5" />
            <span>Download</span>
          </TabsTrigger>

          <TabsTrigger 
            value="memorial" 
            className="w-full bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 border-none"
          >
            <Upload className="h-5 w-5" />
            <span>Memorial Submission</span>
          </TabsTrigger>

          <TabsTrigger 
            value="clarifications" 
            className="w-full bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 border-none"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Clarifications</span>
          </TabsTrigger>

          <TabsTrigger 
            value="announcements" 
            className="w-full bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 border-none"
          >
            <Bell className="h-5 w-5" />
            <span>Announcements</span>
          </TabsTrigger>

          <TabsTrigger 
            value="support" 
            className="w-full bg-transparent hover:bg-gray-50 text-gray-700 rounded-lg h-12 flex items-center justify-start gap-3 px-4 data-[state=active]:bg-gray-100 data-[state=active]:text-gray-900 border-none"
          >
            <Phone className="h-5 w-5" />
            <span>Support</span>
          </TabsTrigger>
        </TabsList>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-gray-100">
        <Button 
          variant="ghost" 
          className="w-full bg-green-700 hover:bg-green-800 text-white rounded-lg h-12 flex items-center justify-start gap-3 px-4"
          onClick={() => {
            // Handle logout logic here
            console.log("Logout clicked")
          }}
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Button>
      </div>
    </aside>
  )
}

export default Sidebar