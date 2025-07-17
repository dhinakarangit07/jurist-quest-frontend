"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Download, Upload, MessageSquare, Bell, LogOut, LayoutDashboard } from "lucide-react"

// Define the main navigation items for the sidebar
const mainMenuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Download",
    url: "/downloads",
    icon: Download,
  },
  {
    title: "Memorial Submission",
    url: "/memorial",
    icon: Upload,
  },
  {
    title: "Clarifications",
    url: "/clarifications",
    icon: MessageSquare,
  },
  {
    title: "Announcements",
    url: "/announcements",
    icon: Bell,
  },
]

interface AppSidebarProps {
  currentPath?: string
  onLogout?: () => void
  open?: boolean // for mobile overlay
  onClose?: () => void // for mobile overlay
}

export function AppSidebar({ currentPath = "/", onLogout, open, onClose }: AppSidebarProps) {
  const handleLogout = () => {
    console.log("Logging out...")
    onLogout?.()
  }

  return (
    <Sidebar variant="sidebar" collapsible="icon" {...(typeof open === 'boolean' ? { open: open, onOpenChange: (v: boolean) => { if (!v) onClose?.() } } : {})}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={currentPath === item.url} tooltip={item.title}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
              <LogOut />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
