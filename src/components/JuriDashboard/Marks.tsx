"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ChevronLeft, RefreshCw, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import useSubmitMarks from "@/hooks/useJuryMarks"
import useGetJuryMarks from "@/hooks/useGetJuryMarks"
import MemorialUploadSkeleton from "@/components/skeleton/TeamDashboard/MemorialUploadSkeleton"

// Marking criteria
const markingCriteria = [
  { id: "knowledge_of_law_and_facts", name: "Knowledge of Law and Facts", max_points: 20 },
  { id: "evidence_of_original_thought", name: "Evidence of Original Thought", max_points: 20 },
  { id: "proper_and_articulate_analysis", name: "Proper and Articulate Analysis", max_points: 20 },
  { id: "clarity_and_organization", name: "Clarity and Organization", max_points: 10 },
  { id: "extent_and_use_of_research", name: "Extent and Use of Research", max_points: 10 },
  { id: "correct_format_and_citation", name: "Correct Format and Citation", max_points: 10 },
  { id: "grammar_and_style", name: "Grammar and Style", max_points: 10 },
]

const initialScoresState = () => {
  const state = {}
  markingCriteria.forEach((criterion) => {
    state[criterion.id] = ""
  })
  state["overall_comments"] = ""
  return state
}

const MarksEntryPage = () => {
  const [scores, setScores] = useState(initialScoresState())
  const [searchParams] = useSearchParams()
  const teamCode = searchParams.get("teamCode")
  
  const getJuryId = () => {
    const juryDetails = localStorage.getItem("jury_details")
    if (juryDetails) {
      try {
        const parsedDetails = JSON.parse(juryDetails)
        if (Array.isArray(parsedDetails) && parsedDetails.length > 0) {
          return parsedDetails[0].id
        }
        return parsedDetails.id // Fallback for non-array object
      } catch (e) {
        console.error("Failed to parse jury_details from localStorage", e)
        return null
      }
    }
    return null
  }

  const [juryId, setJuryId] = useState<number | null>(getJuryId())
  const [teamName, setTeamName] = useState("")

  const { marks: existingMarks, isLoading: isLoadingMarks, error: fetchError } = useGetJuryMarks(teamCode, juryId)
  const { isSubmitting, submitMessage, error: submitError, submitMarks } = useSubmitMarks()

  useEffect(() => {
    setTeamName(teamCode || "Selected Team")
  }, [teamCode])

  useEffect(() => {
    if (existingMarks) {
      const newScores = { ...initialScoresState(), ...existingMarks }
      setScores(newScores)
    }
  }, [existingMarks])

  const handleScoreChange = (field: string, value: string) => {
    setScores((prev) => ({ ...prev, [field]: value }))
  }

  const calculateTotal = (currentScores) => {
    const scoreKeys = Object.keys(initialScoresState()).filter(k => k !== 'overall_comments')
    return scoreKeys.reduce((total, key) => {
      const value = Number(currentScores[key])
      return total + (isNaN(value) ? 0 : value)
    }, 0)
  }

  const handleSubmit = async () => {
    if (!teamCode || !juryId) {
      alert("Team code or Jury ID is missing.")
      return
    }

    const scoreKeys = Object.keys(initialScoresState()).filter(k => k !== 'overall_comments')
    const processedScores = { ...scores }
    scoreKeys.forEach(key => {
      if (processedScores[key] === '' || processedScores[key] === null || processedScores[key] === undefined) {
        processedScores[key] = 0
      }
    })

    const marksData = { ...processedScores, team_id: teamCode, jury_id: juryId }
    await submitMarks(marksData, existingMarks?.id || null)
  }

  const handleReset = () => {
    setScores(initialScoresState())
  }

  const handleGoBack = () => {
    window.location.href = "/juri-dashboard?view=team"
  }

  if (isLoadingMarks) {
    return <MemorialUploadSkeleton />
  }

  if (fetchError) {
    return <div className="text-center py-8 text-red-500"><p>{fetchError}</p></div>
  }

  const totalScore = calculateTotal(scores)
  const totalMaxScore = markingCriteria.reduce((sum, criterion) => sum + criterion.max_points, 0)
    const scorePercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="relative bg-[#2d4817] rounded-xl shadow-lg overflow-hidden p-6 text-white">
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-4 left-4 text-white hover:bg-white/10 hover:text-white rounded-full"
            onClick={handleGoBack}
          >
            <ChevronLeft className="h-6 w-6" />
            <span className="sr-only">Back to Dashboard</span>
          </Button>
          
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Marks Entry</h1>
            <div className="inline-flex items-center bg-white/10 px-4 py-1.5 rounded-full">
              <span className="text-sm font-medium">{teamName}</span>
            </div>
          </div>
        </div>

        {/* Scoring Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6 space-y-6">
            {markingCriteria.map((criterion) => (
              <div key={criterion.id} className="border-b border-gray-100 pb-6 last:border-b-0 last:pb-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 text-lg">{criterion.name}</h3>
                  </div>
                  <div className="flex items-center gap-2 sm:w-40">
                    <Input 
                      type="number" 
                      min="0" 
                      max={criterion.max_points} 
                      placeholder="0" 
                      className="w-full text-right font-medium" 
                      value={scores[criterion.id] || ""} 
                      onChange={(e) => handleScoreChange(criterion.id, e.target.value)} 
                    />
                    <span className="text-sm text-gray-500 whitespace-nowrap">/ {criterion.max_points}</span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Comments Section */}
            <div className="pt-4">
              <h3 className="font-semibold text-gray-900 text-lg mb-2">Overall Comments</h3>
              <Textarea 
                placeholder="Provide constructive feedback on the team's performance..." 
                className="min-h-[120px] text-sm" 
                value={scores["overall_comments"] || ""} 
                onChange={(e) => handleScoreChange("overall_comments", e.target.value)} 
              />
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="bg-white shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#e6e6e6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke={scorePercentage >= 70 ? "#2d4817" : scorePercentage >= 40 ? "#f59e0b" : "#ef4444"}
                      strokeWidth="3"
                      strokeDasharray={`${scorePercentage}, 100`}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">
                      {totalScore}
                    </span>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-semibold text-gray-900">Total Score</h3>
                  <p className="text-sm text-gray-500">
                    {totalScore} out of {totalMaxScore} points
                  </p>
                  <p className={`text-sm font-medium mt-1 ${
                    scorePercentage >= 70 ? "text-[#2d4817]" : 
                    scorePercentage >= 40 ? "text-[#2d4817]" : "text-red-600"
                  }`}>
                    ({scorePercentage}%)
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  variant="outline" 
                  onClick={handleReset} 
                  disabled={isSubmitting}
                  className="gap-2"
                >
                  <RefreshCw className="h-4 w-4" />
                  Reset Scores
                </Button>
                <Button 
                  onClick={handleSubmit} 
                  disabled={isSubmitting}
                  className="bg-[#2d4817] hover:bg-[#2d4817] gap-2"
                >
                  {isSubmitting ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {existingMarks ? 'Update Scores' : 'Submit Scores'}
                </Button>
              </div>
            </div>
            
            {(submitMessage || submitError) && (
              <div className={`mt-4 p-3 rounded-md text-center text-sm ${
                submitError ? "bg-red-50 text-red-700" : "bg-emerald-50 text-emerald-700"
              }`}>
                {submitMessage || submitError}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Help Card */}
        <Card className="bg-gray-50 border-0 shadow-none">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">
              {existingMarks 
                ? 'You can update the scores as needed. Changes will be saved immediately.' 
                : 'Please enter scores for each criterion. All fields are required.'
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default MarksEntryPage
