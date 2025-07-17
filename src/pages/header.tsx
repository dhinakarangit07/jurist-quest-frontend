import { Bell, Settings, Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import logo from "@/assets/logo.png"
interface HeaderProps {
  onSidebarToggle?: () => void
}

export function Header({ onSidebarToggle }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        {/* Logo and Mobile Menu */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onSidebarToggle}
          >
            <Menu className="w-5 h-5" />
          </Button>
          {/* Logo moved from sidebar to header */}
          <div className="flex items-center gap-3">
            <img 
              src={logo}
              alt="Jurist Quest Logo" 
              className="h-30 w-auto md:w-[160px] object-contain"
            />
          </div>
        </div>
        {/* Search Section (moved from dashboard) */}
        <div className="relative w-full max-w-md ml-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-9 pr-4 py-2 rounded-md border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </header>
  )
}
