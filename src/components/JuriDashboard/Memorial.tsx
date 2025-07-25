"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Eye, Download, XCircle, ArrowLeft } from "lucide-react"
import useMemorials from "@/hooks/useMemorials" // Assuming this hook is available and provides document URLs
import MemorialUploadSkeleton from "@/components/skeleton/TeamDashboard/MemorialUploadSkeleton" // Reusing the skeleton for consistency

const Memorial = () => {
  const { memorials, isLoading, error } = useMemorials()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [previewTitle, setPreviewTitle] = useState<string | null>(null)

  const handlePreview = (url: string, title: string) => {
    setPreviewUrl(url)
    setPreviewTitle(title)
  }

  const handleClosePreview = () => {
    setPreviewUrl(null)
    setPreviewTitle(null)
  }

  const handleGoBack = () => {
    // Navigate to /juri-dashboard without using Next.js Link
    window.location.href = "/juri-dashboard?view=team"
  }

  // Add a dummy memorial for demonstration if no actual data is loaded
  const displayMemorials =
    memorials.length > 0
      ? memorials
      : [
          {
            id: "sample-1",
            file: "/Pdf-sample.pdf", // Path to the new sample PDF
            moot_problem: "problem1",
            moot_problem_display: "MOOT PROBLEM - I (Sample)",
            created_at: new Date().toISOString(),
          },
        ]

  if (isLoading) {
    return <MemorialUploadSkeleton /> // Reusing the skeleton for loading state
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6 lg:px-8">
      {/* Back button added here */}
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-600 hover:text-gray-900"
          onClick={handleGoBack} // Use onClick for navigation
        >
          <ArrowLeft className="h-6 w-6" />
          <span className="sr-only">Back to Dashboard</span>
        </Button>
      </div>

      <Card className="shadow-lg rounded-xl border border-gray-200">
        <CardHeader className="pb-6 border-b border-gray-200">
          <CardTitle className="text-3xl font-bold text-gray-900">Submitted Memorials</CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Review and preview all memorial documents submitted by teams.
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {displayMemorials.length > 0 ? (
              displayMemorials.map((memorial) => (
                <div
                  key={memorial.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
                >
                  <div className="flex items-center gap-4 mb-4 sm:mb-0 flex-grow">
                    <FileText className="h-6 w-6 text-gray-700 shrink-0" />
                    <div>
                      <p className="font-semibold text-lg text-gray-900 break-words">
                        {memorial.file.split("/").pop()}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">{memorial.moot_problem_display}</span> -{" "}
                        {new Date(memorial.created_at).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
                    <Button
                      variant="outline"
                      size="default"
                      className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700 bg-transparent"
                      onClick={() => handlePreview(memorial.file, memorial.file.split("/").pop() || "Document Preview")}
                    >
                      <Eye className="mr-2 h-5 w-5" />
                      Preview
                    </Button>
                    <Button
                      variant="default"
                      size="default"
                      className="bg-[#2d4817] hover:bg-[#2a4015] text-white"
                      asChild
                    >
                      <a href={memorial.file} download={memorial.file.split("/").pop()}>
                        <Download className="mr-2 h-5 w-5" />
                        Download
                      </a>
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl font-medium">No memorials have been submitted yet.</p>
                <p className="text-md mt-2">Once teams upload their documents, they will appear here for review.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {previewUrl && (
        <Card className="mt-8 shadow-xl rounded-xl border border-gray-200">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-gray-200">
            <CardTitle className="text-2xl font-bold text-gray-900">{previewTitle}</CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClosePreview}
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-7 w-7" />
              <span className="sr-only">Close Preview</span>
            </Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="relative w-full h-[80vh] bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
              <iframe
                src={previewUrl}
                className="w-full h-full"
                title={previewTitle || "Document Preview"}
                style={{ border: "none" }}
              />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Memorial
