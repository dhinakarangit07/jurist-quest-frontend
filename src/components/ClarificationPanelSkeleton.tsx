import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

const ClarificationPanelSkeleton = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Clarification Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Skeleton className="h-8 w-64 mb-6" />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4">
              <Skeleton className="w-16 h-16 rounded-full" />
              <div>
                <Skeleton className="h-10 w-16 mb-1" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>
          ))}
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <Skeleton className="h-6 w-32 mb-3" />
            <div className="text-sm text-gray-600 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-48" />
            </div>
          </div>
        </div>
      </div>

      {/* Submit Clarification */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <Skeleton className="h-8 w-56 mb-2" />
        <Skeleton className="h-4 w-80 mb-6" />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-12 w-full" />
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-24 w-full" />
          </div>

          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Clarification History */}
      <Card>
        <CardHeader className="pb-4">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-72 mt-1" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <Skeleton className="h-5 w-5" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ClarificationPanelSkeleton
