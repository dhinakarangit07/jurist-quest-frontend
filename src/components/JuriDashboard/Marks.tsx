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
    {
      id: "oral_presentation",
      name: "Oral Presentation",
      description: "Clarity, confidence, and persuasiveness of argument",
      max_points: 30,
      sub_criteria: [
        { id: "clarity_of_argument", name: "Clarity of Argument", max_points: 10 },
        { id: "confidence_and_poise", name: "Confidence and Poise", max_points: 10 },
        { id: "persuasiveness", name: "Persuasiveness", max_points: 10 },
      ],
    },
    {
      id: "legal_knowledge",
      name: "Legal Knowledge and Research",
      description: "Understanding of relevant law and use of authorities",
      max_points: 25,
      sub_criteria: [
        { id: "understanding_of_law", name: "Understanding of Law", max_points: 10 },
        { id: "use_of_legal_authorities", name: "Use of Legal Authorities", max_points: 10 },
        { id: "relevance_of_research", name: "Relevance of Research", max_points: 5 },
      ],
    },
    {
      id: "response",
      name: "Response to Questions",
      description: "Ability to answer judges' questions effectively",
      max_points: 25,
      sub_criteria: [
        { id: "accuracy_of_answers", name: "Accuracy of Answers", max_points: 10 },
        { id: "composure_under_pressure", name: "Composure Under Pressure", max_points: 10 },
        { id: "relevance_to_question", name: "Relevance to Question", max_points: 5 },
      ],
    },
    {
      id: "structure",
      name: "Structure and Logic",
      description: "Logical flow and organization of arguments",
      max_points: 10,
      sub_criteria: [
        { id: "logical_flow", name: "Logical Flow", max_points: 5 },
        { id: "organization", name: "Organization", max_points: 5 },
      ],
    },
    { id: "time_management", name: "Time Management", max_points: 5, sub_criteria: [] },
    { id: "professionalism", name: "Professionalism", max_points: 5, sub_criteria: [] },
]

const initialScoresState = () => {
    const state = {}
    markingCriteria.forEach((criterion) => {
        if (criterion.sub_criteria.length > 0) {
            criterion.sub_criteria.forEach((sub) => {
                state[sub.id] = ""
            })
        } else {
            state[criterion.id] = ""
        }
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
        const scoreKeys = Object.keys(initialScoresState()).filter(k => k !== 'overall_comments');
        return scoreKeys.reduce((total, key) => {
            const value = Number(currentScores[key]);
            return total + (isNaN(value) ? 0 : value);
        }, 0);
    }

    const handleSubmit = async () => {
        if (!teamCode || !juryId) {
            alert("Team code or Jury ID is missing.")
            return
        }

        const scoreKeys = Object.keys(initialScoresState()).filter(k => k !== 'overall_comments');
        const processedScores = { ...scores };
        scoreKeys.forEach(key => {
            if (processedScores[key] === '' || processedScores[key] === null || processedScores[key] === undefined) {
                processedScores[key] = 0;
            }
        });

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

    return (
        <div className="space-y-6 p-4 md:p-6">
            <div className="bg-gradient-to-r from-[#2d4817] to-[#3d5a1f] rounded-lg p-6 text-white relative">
                <Button variant="ghost" size="icon" className="absolute top-4 left-4 text-white hover:bg-white/20 hover:text-white" onClick={handleGoBack}>
                    <ChevronLeft className="h-6 w-6" />
                    <span className="sr-only">Back to Dashboard</span>
                </Button>
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-2">Marks Entry</h1>
                    <p className="text-lg opacity-90">{teamName}</p>
                </div>
            </div>

            <Card>
                <CardContent className="space-y-6 p-6">
                    {markingCriteria.map((criterion) => (
                        <div key={criterion.id} className="border-b pb-4 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h3 className="font-medium text-gray-900">{criterion.name}</h3>
                                    <p className="text-xs text-gray-500">{criterion.description}</p>
                                </div>
                                {criterion.sub_criteria.length === 0 && (
                                    <div className="text-right">
                                        <Input type="number" min="0" max={criterion.max_points} placeholder="0" className="w-20 text-right" value={scores[criterion.id] || ""} onChange={(e) => handleScoreChange(criterion.id, e.target.value)} />
                                        <p className="text-xs text-gray-500">/ {criterion.max_points}</p>
                                    </div>
                                )}
                            </div>
                            {criterion.sub_criteria.length > 0 && (
                                <div className="mt-3 pl-4 space-y-3">
                                    {criterion.sub_criteria.map((sub) => (
                                        <div key={sub.id} className="flex justify-between items-center">
                                            <Label htmlFor={sub.id} className="text-sm text-gray-700">{sub.name}</Label>
                                            <div className="flex items-center gap-2">
                                                <Input id={sub.id} type="number" min="0" max={sub.max_points} placeholder="0" className="w-16 text-right text-sm" value={scores[sub.id] || ""} onChange={(e) => handleScoreChange(sub.id, e.target.value)} />
                                                <span className="text-xs text-gray-500">/ {sub.max_points}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="border-b pb-4 last:border-b-0">
                        <h3 className="font-medium text-gray-900">Overall Comments</h3>
                        <Textarea placeholder="Provide overall feedback here..." className="mt-2 text-sm" value={scores["overall_comments"] || ""} onChange={(e) => handleScoreChange("overall_comments", e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
                        <div className="grid grid-cols-1 gap-8 text-center">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-blue-700">Total Score</p>
                                <p className="text-3xl font-bold text-blue-900">{totalScore.toFixed(0)}</p>
                                <p className="text-xs text-gray-500">/ 100</p>
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button variant="outline" onClick={handleReset} disabled={isSubmitting}><RefreshCw className="mr-2 h-4 w-4" />Reset Scores</Button>
                            <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-[#2d4817] hover:bg-[#3d5a1f]">
                                {isSubmitting ? (<><RefreshCw className="mr-2 h-4 w-4 animate-spin" />Submitting...</>) : (<><Save className="mr-2 h-4 w-4" />{existingMarks ? 'Update' : 'Submit'} Scores</>)}
                            </Button>
                        </div>
                    </div>
                    {submitMessage && (
                        <div className={`mt-4 p-3 rounded text-center ${submitError ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"}`}>
                            {submitMessage}
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card className="bg-gray-50">
                <CardContent className="p-4">
                    <p className="text-sm text-gray-600 text-center">
                        {existingMarks ? 'Update the scores as needed.' : 'Enter scores for each criterion.'} Click "{existingMarks ? 'Update' : 'Submit'} Scores" when finished.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

export default MarksEntryPage