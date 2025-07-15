
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, FileText, Clock, CheckCircle, AlertTriangle } from "lucide-react";

interface MemorialUploadProps {
  teamCode: string;
}

const MemorialUpload = ({ teamCode }: MemorialUploadProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadHistory, setUploadHistory] = useState([
    {
      id: 1,
      fileName: "Memorial_ABC123_v1.pdf",
      uploadDate: "2024-12-05 14:30",
      status: "submitted",
      version: 1
    }
  ]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      const newUpload = {
        id: uploadHistory.length + 1,
        fileName: selectedFile.name,
        uploadDate: new Date().toLocaleString(),
        status: "submitted",
        version: uploadHistory.length + 1
      };
      setUploadHistory([newUpload, ...uploadHistory]);
      setSelectedFile(null);
      // Reset file input
      const fileInput = document.getElementById('memorial-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
    }
  };

  const deadline = new Date("2024-12-08T23:59:59");
  const isUrgent = (deadline.getTime() - new Date().getTime()) < (3 * 24 * 60 * 60 * 1000); // 3 days

  return (
    <div className="space-y-6">
      {/* Deadline Alert */}
      <Alert className={`${isUrgent ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
        <AlertTriangle className={`h-4 w-4 ${isUrgent ? 'text-red-600' : 'text-yellow-600'}`} />
        <AlertTitle className={isUrgent ? 'text-red-800' : 'text-yellow-800'}>
          Memorial Submission Deadline
        </AlertTitle>
        <AlertDescription className={isUrgent ? 'text-red-700' : 'text-yellow-700'}>
          Deadline: <strong>December 8, 2024 at 11:59 PM</strong>
          {isUrgent && <span className="ml-2 font-semibold">⚠️ URGENT - Less than 3 days left!</span>}
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-500" />
              Submit Memorial
            </CardTitle>
            <CardDescription>
              Upload your memorial document (PDF format only, max 10MB)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="memorial-upload">Select Memorial PDF</Label>
              <Input
                id="memorial-upload"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="cursor-pointer"
              />
            </div>

            {selectedFile && (
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-blue-600" />
                  <span className="font-medium text-blue-800">{selectedFile.name}</span>
                </div>
                <p className="text-sm text-blue-600">
                  Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            )}

            <Button 
              onClick={handleUpload}
              disabled={!selectedFile}
              className="w-full bg-green-500 hover:bg-green-600"
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Memorial
            </Button>

            <div className="text-xs text-gray-500 space-y-1">
              <p>• Only PDF files are accepted</p>
              <p>• Maximum file size: 10MB</p>
              <p>• File naming: Memorial_{teamCode}_v[version].pdf</p>
            </div>
          </CardContent>
        </Card>

        {/* Upload History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-green-500" />
              Upload History
            </CardTitle>
            <CardDescription>
              Track your memorial submissions and versions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {uploadHistory.length > 0 ? (
                uploadHistory.map((upload) => (
                  <div key={upload.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <FileText className="h-4 w-4 text-gray-600" />
                        <span className="font-medium text-sm">{upload.fileName}</span>
                      </div>
                      <p className="text-xs text-gray-500">{upload.uploadDate}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        v{upload.version}
                      </Badge>
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                  <p>No uploads yet</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemorialUpload;
