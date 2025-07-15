
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Submit Clarification */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-blue-500" />
              Submit Clarification
            </CardTitle>
            <CardDescription>
              Ask questions about competition rules, procedures, or technical issues
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  placeholder="Brief subject of your question"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="question">Question</Label>
                <Textarea
                  id="question"
                  placeholder="Describe your question in detail..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  required
                  rows={4}
                />
              </div>

              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                <Send className="h-4 w-4 mr-2" />
                Submit Clarification
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-green-500" />
              Clarification Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">
                  {clarifications.filter(c => c.status === "answered").length}
                </p>
                <p className="text-sm text-blue-700">Answered</p>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <p className="text-2xl font-bold text-yellow-600">
                  {clarifications.filter(c => c.status === "pending").length}
                </p>
                <p className="text-sm text-yellow-700">Pending</p>
              </div>
            </div>
            
            <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
              <p className="font-medium mb-1">Response Time:</p>
              <p>• Urgent queries: Within 2 hours</p>
              <p>• General queries: Within 24 hours</p>
            </div>
          </CardContent>
        </Card>
      </div>

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
