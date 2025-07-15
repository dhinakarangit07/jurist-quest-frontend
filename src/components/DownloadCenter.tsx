
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar, Award, Book, Gavel } from "lucide-react";

const DownloadCenter = () => {
  const downloads = [
    {
      category: "Competition Materials",
      icon: <Gavel className="h-5 w-5" />,
      items: [
        { name: "Moot Problem 2024", type: "PDF", size: "2.4 MB", updated: "Dec 1, 2024", important: true },
        { name: "Competition Rules & Guidelines", type: "PDF", size: "1.8 MB", updated: "Nov 28, 2024", important: true },
        { name: "Memorial Writing Guidelines", type: "PDF", size: "950 KB", updated: "Nov 25, 2024", important: false },
      ]
    },
    {
      category: "Schedules & Timelines",
      icon: <Calendar className="h-5 w-5" />,
      items: [
        { name: "Competition Schedule", type: "PDF", size: "650 KB", updated: "Dec 5, 2024", important: true },
        { name: "Round Timings", type: "Excel", size: "420 KB", updated: "Dec 4, 2024", important: false },
        { name: "Important Dates Calendar", type: "PDF", size: "380 KB", updated: "Nov 30, 2024", important: false },
      ]
    },
    {
      category: "Templates & Forms",
      icon: <FileText className="h-5 w-5" />,
      items: [
        { name: "Memorial Template", type: "DOCX", size: "125 KB", updated: "Nov 20, 2024", important: false },
        { name: "Citation Style Guide", type: "PDF", size: "890 KB", updated: "Nov 18, 2024", important: false },
        { name: "Team Registration Form", type: "PDF", size: "320 KB", updated: "Nov 15, 2024", important: false },
      ]
    },
    {
      category: "Resources & References",
      icon: <Book className="h-5 w-5" />,
      items: [
        { name: "Legal Research Guide", type: "PDF", size: "3.2 MB", updated: "Nov 25, 2024", important: false },
        { name: "Case Law Compilation", type: "PDF", size: "5.8 MB", updated: "Nov 22, 2024", important: false },
        { name: "Previous Year Samples", type: "ZIP", size: "12.4 MB", updated: "Nov 20, 2024", important: false },
      ]
    },
    {
      category: "Certificates & Awards",
      icon: <Award className="h-5 w-5" />,
      items: [
        { name: "Participation Certificate Template", type: "PDF", size: "1.1 MB", updated: "Dec 1, 2024", important: false },
        { name: "Winner Certificate Template", type: "PDF", size: "1.2 MB", updated: "Dec 1, 2024", important: false },
      ]
    }
  ];

  const handleDownload = (fileName: string) => {
    // Mock download function
    console.log(`Downloading: ${fileName}`);
  };

  return (
    <div className="space-y-6">
      {downloads.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-gray-800">
              {category.icon}
              {category.category}
            </CardTitle>
            <CardDescription>
              Essential documents and resources for the competition
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <FileText className="h-4 w-4 text-gray-500" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-gray-900">{item.name}</span>
                        {item.important && (
                          <Badge className="bg-red-100 text-red-700 text-xs">Important</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{item.type}</span>
                        <span>{item.size}</span>
                        <span>Updated: {item.updated}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    onClick={() => handleDownload(item.name)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Quick Download Stats */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-0">
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {downloads.reduce((total, category) => total + category.items.length, 0)}
              </div>
              <div className="text-sm text-blue-700">Total Downloads</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600 mb-1">
                {downloads.reduce((total, category) => 
                  total + category.items.filter(item => item.important).length, 0)}
              </div>
              <div className="text-sm text-green-700">Important Files</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-purple-600 mb-1">
                {downloads.length}
              </div>
              <div className="text-sm text-purple-700">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DownloadCenter;
