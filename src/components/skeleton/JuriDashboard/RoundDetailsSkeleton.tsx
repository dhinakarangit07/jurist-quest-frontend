import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

const RoundDetailsSkeleton = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <Skeleton className="h-8 w-48 mb-2" />
        <Skeleton className="h-4 w-72 mb-6" />

        {/* Main Content */}
        <Card className="mt-0">
          <CardContent className="space-y-6 p-6">
            {/* Round Title and Status */}
            <div className="flex items-center justify-between mb-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-6 w-24" />
            </div>
            {/* Grid Layout for Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column - Event Details */}
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div className="flex items-center gap-3 mb-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                <div className="flex items-center gap-3">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              {/* Right Column - Opponent Details */}
              <div className="flex flex-col items-end">
                <Skeleton className="h-5 w-32 mb-2" />
                <div className="text-right">
                    <Skeleton className="h-6 w-40 mb-1" />
                    <Skeleton className="h-4 w-48 mt-1" />
                </div>
              </div>
            </div>
            {/* Action Button */}
            <div className="pt-4">
                <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default RoundDetailsSkeleton