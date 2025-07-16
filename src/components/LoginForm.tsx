"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Eye, EyeOff, Scale, Gavel } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import LoadingScreen from "@/components/LoadingScreen"

interface LoginFormProps {
  onLogin: (teamData: any) => void
}

const Index = ({ onLogin }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [teamCode, setTeamCode] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPageLoading, setIsPageLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading time for video and content
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Mock authentication - same as original working code
    setTimeout(() => {
      if (teamCode === "ABC123" && password === "moot2024") {
        onLogin({
          teamCode: "ABC123",
          teamName: "Legal Eagles",
          university: "University of Excellence",
          participants: ["John Doe", "Jane Smith", "Mike Johnson"],
        })
      } else {
        toast({
          title: "Authentication Failed",
          description: "Invalid team code or password. Please try again.",
          variant: "destructive",
        })
      }
      setIsLoading(false)
    }, 1000)
  }

  if (isPageLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video className="w-full h-full object-cover" autoPlay muted loop playsInline>
          <source
            src="https://videos.pexels.com/video-files/6192775/6192775-uhd_2560_1440_25fps.mp4"
            type="video/mp4"
          />
          {/* Fallback background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800" />
        </video>
        {/* Enhanced video overlay for better readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px]" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/8 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/8 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Main Content */}
      <div className="relative z-20 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="relative">
                <Scale className="w-12 h-12 text-amber-400 drop-shadow-lg" />
                <Gavel className="w-6 h-6 text-amber-300 absolute -top-1 -right-1 drop-shadow-lg" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2 font-serif drop-shadow-lg">Moot Court</h1>
            <p className="text-xl text-amber-300 font-light tracking-wide drop-shadow-md">Competition Portal</p>
            <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full shadow-lg" />
          </div>

          {/* Login Card */}
          <Card className="bg-white/15 backdrop-blur-xl border-white/25 shadow-2xl animate-scale-in">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-2xl font-semibold text-white drop-shadow-md">Welcome Back</CardTitle>
              <CardDescription className="text-white/80 text-base">
                Sign in to access your competition dashboard
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamCode" className="text-white/90 font-medium">
                    Team Code
                  </Label>
                  <Input
                    id="teamCode"
                    type="text"
                    placeholder="Enter your team code"
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value)}
                    required
                    className="bg-white/10 border-white/25 text-white placeholder:text-white/60 h-12 focus:border-amber-400 focus:ring-amber-400/30 backdrop-blur-sm"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white/90 font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/10 border-white/25 text-white placeholder:text-white/60 h-12 pr-12 focus:border-amber-400 focus:ring-amber-400/30 backdrop-blur-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-white/80 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-white/25 bg-white/10 text-amber-400 focus:ring-amber-400/30"
                    />
                    Remember me
                  </label>
                 
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing In...
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Additional Options */}
              <div className="mt-8 pt-6 border-t border-white/25">
                <div className="text-center text-white/80 text-sm">
                  New participant?{" "}
                  <button className="text-amber-300 hover:text-amber-200 font-medium transition-colors">
                    Register for Competition
                  </button>
                </div>

                <div className="mt-4 text-center">
                  <button className="text-white/70 hover:text-white/90 text-sm transition-colors">
                    Competition Guidelines & Rules
                  </button>
                </div>
              </div>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-lg border border-white/25">
                <p className="text-sm font-bold text-amber-300 mb-2 text-center">Demo Credentials</p>
                <div className="space-y-1">
                  <p className="text-sm text-white/80 flex justify-between">
                    <span>Team Code:</span>
                    <span className="font-mono font-bold text-amber-300">ABC123</span>
                  </p>
                  <p className="text-sm text-white/80 flex justify-between">
                    <span>Password:</span>
                    <span className="font-mono font-bold text-amber-300">moot2024</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Index
