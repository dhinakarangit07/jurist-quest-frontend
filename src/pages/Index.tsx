"use client"

import { useState } from "react"
import LoginForm from "@/components/LoginForm"
import Dashboard from "./dashboard"


const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [teamData, setTeamData] = useState({
    teamCode: "",
    teamName: "",
    university: "",
    participants: [],
  })

  const handleLogin = (data: any) => {
    setTeamData(data)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setTeamData({
      teamCode: "",
      teamName: "",
      university: "",
      participants: [],
    })
  }

  if (!isLoggedIn) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <Dashboard />
}

export default Index
