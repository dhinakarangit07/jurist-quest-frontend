"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, User, KeyRound } from "lucide-react"

interface LoginFormProps {
  onLogin: (teamData: any) => void
}

const LoginForm = ({ onLogin }: LoginFormProps) => {
  const [teamCode, setTeamCode] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Mock authentication - replace with real authentication
    setTimeout(() => {
      if (teamCode === "ABC123" && password === "moot2024") {
        onLogin({
          teamCode: "ABC123",
          teamName: "Legal Eagles",
          university: "University of Excellence",
          participants: ["John Doe", "Jane Smith", "Mike Johnson"],
        })
      } else {
        setError("Invalid team code or password. Please try again.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Section: Illustration and Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-400 via-green-500 to-green-600 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 bg-white rounded-full"></div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12 text-center">
          {/* Logo/Icon */}
          <div className="inline-flex items-center justify-center p-6 bg-white rounded-full mb-8 shadow-2xl">
            <Trophy className="h-16 w-16 text-green-600" />
          </div>

          {/* Title */}
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight leading-tight">WELCOME</h1>
          <p className="text-green-100 text-xl mb-8 max-w-md">Moot Court Competition Portal</p>

          {/* Illustration Area */}
          <div className="relative">
            <div className="w-64 h-64 bg-white/20 rounded-3xl flex items-center justify-center backdrop-blur-sm border border-white/30">
              <div className="text-center">
                <User className="h-24 w-24 text-white mx-auto mb-4" />
                <p className="text-white text-sm">Secure Access Portal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section: Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Header */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center p-4 bg-green-600 rounded-full mb-4">
              <Trophy className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Moot Court Competition</h1>
          </div>

          <Card className="shadow-2xl rounded-2xl bg-white border-0">
            <CardHeader className="space-y-4 pb-8">
              <CardTitle className="text-3xl text-center font-bold text-gray-900">WELCOME</CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Enter your credentials to access the dashboard
              </CardDescription>
            </CardHeader>

            <CardContent className="px-8 pb-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="teamCode" className="text-gray-700 font-semibold flex items-center gap-2">
                    <User className="h-4 w-4 text-green-600" />
                    Team Code
                  </Label>
                  <Input
                    id="teamCode"
                    type="text"
                    placeholder="Enter your team code"
                    value={teamCode}
                    onChange={(e) => setTeamCode(e.target.value)}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-lg"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 font-semibold flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-green-600" />
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-12 border-2 border-gray-200 focus:border-green-600 focus:ring-2 focus:ring-green-200 transition-all duration-200 rounded-lg"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200"
                  >
                    Forgot Password?
                  </button>
                </div>

                {error && (
                  <Alert className="border-red-300 bg-red-50 text-red-800 rounded-lg">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-green-600 hover:bg-green-700 text-white text-lg font-semibold rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
                  disabled={isLoading}
                >
                  {isLoading ? "SIGNING IN..." : "LOGIN"}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-6 bg-green-50 rounded-xl border-2 border-green-200">
                <p className="text-sm font-bold text-green-800 mb-3 text-center">Demo Credentials</p>
                <div className="space-y-2">
                  <p className="text-sm text-green-700 flex justify-between">
                    <span>Team Code:</span>
                    <span className="font-mono font-bold">ABC123</span>
                  </p>
                  <p className="text-sm text-green-700 flex justify-between">
                    <span>Password:</span>
                    <span className="font-mono font-bold">moot2024</span>
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

export default LoginForm
