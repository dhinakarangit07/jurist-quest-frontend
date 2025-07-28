import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Megaphone, Trophy, ChevronDown } from "lucide-react";
import useJuryAnnouncements from "@/hooks/useJuryAnnouncements";
import AnnouncementFeedSkeleton from "@/components/skeleton/TeamDashboard/AnnouncementFeedSkeleton";

const AnnouncementFeed = () => {
  const { juryAnnouncements, isLoading, error } = useJuryAnnouncements();
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
            {juryAnnouncements.map((announcement) => (
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
