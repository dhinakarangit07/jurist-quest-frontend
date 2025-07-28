import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TeamCardSkeleton = () => {
  return (
    <Card className="shadow-sm border-2 border-[#4CAF50] rounded-lg animate-pulse">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <Skeleton className="w-12 h-12 rounded-full mb-3 bg-gray-200" />
        <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
        <Skeleton className="h-3 w-1/2 bg-gray-200" />
      </CardContent>
    </Card>
  );
};

export default TeamCardSkeleton;
