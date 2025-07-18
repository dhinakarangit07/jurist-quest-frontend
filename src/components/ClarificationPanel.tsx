import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, MessageCircle, Clock } from "lucide-react";

interface ClarificationPanelProps {
  teamCode: string;
}

const ClarificationPanel = ({ teamCode }: ClarificationPanelProps) => {
  const [subject, setSubject] = useState("");
  const [question, setQuestion] = useState("");
  const [clarifications, setClarifications] = useState([
    {
      id: 1,
      subject: "Memorial formatting requirements",
      question: "What is the maximum word limit for the memorial?",
      response: "The memorial should not exceed 2500 words excluding footnotes and bibliography.",
      status: "answered",
      submittedAt: "2024-12-04 10:30",
      respondedAt: "2024-12-04 15:45"
    },
    {
      id: 2,
      subject: "Virtual hearing procedures",
      question: "What platform will be used for virtual hearings and what are the technical requirements?",
      response: "",
      status: "pending",
      submittedAt: "2024-12-05 09:15",
      respondedAt: null
    }
  ]);

  const handleSubmit = () => {
    if (subject && question) {
      const newClarification = {
        id: clarifications.length + 1,
        subject,
        question,
        response: "",
        status: "pending",
        submittedAt: new Date().toLocaleString(),
        respondedAt: null
      };
      setClarifications([newClarification, ...clarifications]);
      setSubject("");
      setQuestion("");
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Clarification Summary */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Clarification Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {clarifications.filter(c => c.status === "answered").length}
                </p>
                <p className="text-sm text-gray-600">Answered</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {clarifications.filter(c => c.status === "pending").length}
                </p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-medium text-sm text-gray-700 mb-2">Response Time:</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>• Urgent queries: Within 2 hours</p>
              <p>• General queries: Within 24 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Clarification */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold">
            Submit Clarification
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Ask questions about competition rules, procedures, or technical issues
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
              <Input
                id="subject"
                placeholder="Brief subject of your question"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-gray-50"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="question" className="text-sm font-medium">Question</Label>
              <Textarea
                id="question"
                placeholder="Describe your question in detail..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                rows={4}
                className="bg-gray-50"
              />
            </div>

            <Button onClick={handleSubmit} className="w-full bg-green-800 hover:bg-green-700">
              <Send className="h-4 w-4 mr-2" />
              Submit Clarification
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Clarification History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-purple-500" />
            Your Clarifications
          </CardTitle>
          <CardDescription>
            View all your submitted questions and responses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {clarifications.map((clarification) => (
              <div key={clarification.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{clarification.subject}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
                      <Clock className="h-3 w-3" />
                      Submitted: {clarification.submittedAt}
                    </p>
                  </div>
                  <Badge 
                    variant={clarification.status === "answered" ? "default" : "secondary"}
                    className={clarification.status === "answered" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}
                  >
                    {clarification.status}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-sm text-gray-700 mb-1">Your Question:</p>
                    <p className="text-sm text-gray-900">{clarification.question}</p>
                  </div>
                  
                  {clarification.response && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="font-medium text-sm text-blue-700 mb-1">Official Response:</p>
                      <p className="text-sm text-blue-900">{clarification.response}</p>
                      {clarification.respondedAt && (
                        <p className="text-xs text-blue-600 mt-2">
                          Responded: {clarification.respondedAt}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClarificationPanel;