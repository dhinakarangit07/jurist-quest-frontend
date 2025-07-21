import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Megaphone, Trophy, ChevronDown } from "lucide-react";
import useAnnouncements from "@/hooks/useAnnouncements";
import AnnouncementFeedSkeleton from "./AnnouncementFeedSkeleton";

const AnnouncementFeed = () => {
  const { announcements, isLoading, error } = useAnnouncements();
  const [openAnnouncementId, setOpenAnnouncementId] = useState<number | null>(null);

  const toggleAnnouncement = (id: number) => {
    setOpenAnnouncementId(openAnnouncementId === id ? null : id);
  };

  if (isLoading) {
    return <AnnouncementFeedSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Quick Actions Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Calendar className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Upcoming Rounds</h4>
            <p className="text-sm text-gray-600 mb-4">View complete schedule of the competition</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Rounds
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Trophy className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Results</h4>
            <p className="text-sm text-gray-600 mb-4">Check latest results</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Results
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#2d4817] rounded-lg shadow-sm">
          <CardContent className="p-6 text-center">
            <Megaphone className="h-12 w-12 text-[#2d4817] mx-auto mb-3" />
            <h4 className="font-semibold text-gray-900 mb-2">Court Hall Allotment</h4>
            <p className="text-sm text-gray-600 mb-4">Access courtroom links</p>
            <Button className="bg-[#2d4817] hover:bg-[#2a4015] text-white px-6">
              View Court Hall
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Competition Announcements */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900">
            Competition Announcements
          </CardTitle>
          <CardDescription className="text-gray-600">
            Stay updated with the latest competition news and updates
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {announcements.map((announcement) => (
                <div key={announcement.id} className="border-b border-gray-200 last:border-b-0">
                  <button
                    className="w-full flex justify-between items-center py-4 px-4 text-left"
                    onClick={() => toggleAnnouncement(announcement.id)}
                  >
                    <div>
                      <p className="font-medium text-gray-900">{announcement.name}</p>
                      <p className="text-sm text-gray-500">{new Date(announcement.created_at).toLocaleString()}</p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${openAnnouncementId === announcement.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openAnnouncementId === announcement.id && (
                    <div className="p-4 bg-gray-50">
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: announcement.description.replace(/src="\//g, `src="${import.meta.env.VITE_API_URL}/`) }} />
                    </div>
                  )}
                </div>
              ))
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnnouncementFeed;
