import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Loader2, ChevronDown, FileText } from "lucide-react";
import useClarifications from "@/hooks/useClarifications";
import ClarificationPanelSkeleton from "@/components/skeleton/TeamDashboard/ClarificationPanelSkeleton";

const ClarificationPanel = () => {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openClarificationId, setOpenClarificationId] = useState<number | null>(null);

  const { clarifications, isLoading, error, submitClarification } = useClarifications();

  const handleSubmit = async () => {
    if (subject && question) {
      setIsSubmitting(true);
      try {
        await submitClarification(subject, question);
        setSubject("");
        setQuestion("");
      } catch (err) {
        // You can add a toast notification here to show the error
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const toggleClarification = (id: number) => {
    setOpenClarificationId(openClarificationId === id ? null : id);
  };

  if (isLoading) {
    return <ClarificationPanelSkeleton />;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        <p>{error.message}</p>
      </div>
    );
  }

  const answeredCount = clarifications.filter(c => c.response).length;
  const pendingCount = clarifications.filter(c => !c.response).length;

  return (
    <div className="max-w-5xl mx-auto space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Clarification Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Clarification Summary
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-[#2d4817]" />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{answeredCount}</p>
              <p className="text-gray-600">Answered</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8 text-[#2d4817]" />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">{pendingCount}</p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="font-semibold text-gray-900 mb-3">Response Time:</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Urgent queries: Within 2 hours</p>
              <p>• General queries: Within 24 hours</p>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Clarification */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Submit Clarification
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Ask questions about competition rules, procedures, or technical issues
        </p>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject" className="text-sm font-medium text-gray-700">Subject</Label>
            <Input
              id="subject"
              placeholder="Brief subject of your question"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="bg-gray-50 border-gray-300 h-12"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="question" className="text-sm font-medium text-gray-700">Question</Label>
            <Textarea
              id="question"
              placeholder="Describe your question in detail"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              rows={4}
              className="bg-gray-50 border-gray-300 resize-none"
            />
          </div>

          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting || !subject || !question}
            className="w-full text-white font-medium h-12 text-base bg-[#2d4817] hover:bg-[#2a4015]"
          >
            {isSubmitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Send className="h-4 w-4 mr-2" />}
            Submit Clarification
          </Button>
        </div>
      </div>

      {/* Clarification History */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-gray-900">Clarification History</CardTitle>
          <CardDescription>
            View your past clarification requests and their responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {isLoading ? (
              <div className="text-center py-8 text-gray-500">
                <Loader2 className="h-8 w-8 mx-auto mb-2 text-gray-400 animate-spin" />
                <p>Loading history...</p>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-red-500">
                <p>{error.message}</p>
              </div>
            ) : clarifications.length > 0 ? (
              clarifications.map((clarification) => (
                <div key={clarification.id} className="border rounded-lg">
                  <button
                    className="w-full flex justify-between items-center p-4 text-left"
                    onClick={() => toggleClarification(clarification.id)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-gray-900">{clarification.subject}</p>
                        <Badge variant={clarification.response ? 'default' : 'secondary'}>
                          {clarification.response ? 'answered' : 'pending'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        Submitted: {new Date(clarification.submittedAt).toLocaleString()}
                      </p>
                    </div>
                    <ChevronDown
                      className={`h-5 w-5 text-gray-500 transform transition-transform ${openClarificationId === clarification.id ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openClarificationId === clarification.id && (
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <p className="font-semibold text-gray-800">Question:</p>
                      <p className="mb-4 text-gray-600">{clarification.question}</p>
                      {clarification.response && (
                        <>
                          <p className="font-semibold text-gray-800">Response:</p>
                          <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: clarification.response.replace(/src="\//g, `src="${import.meta.env.VITE_API_URL}/`) }} />
                          <p className="text-xs text-gray-400 mt-2">
                            Responded: {new Date(clarification.respondedAt).toLocaleString()}
                          </p>
                        </>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>No clarification requests yet.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClarificationPanel;
