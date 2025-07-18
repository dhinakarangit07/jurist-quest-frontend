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
    <div className="max-w-5xl mx-auto space-y-8 p-6 bg-gray-50 min-h-screen">
      {/* Clarification Summary */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Clarification Summary
        </h2>
        
        <div className="flex gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8" style={{ color: '#2d4817' }} />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">
                {clarifications.filter(c => c.status === "answered").length}
              </p>
              <p className="text-gray-600">Answered</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex items-center gap-4 flex-1">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-8 w-8" style={{ color: '#2d4817' }} />
            </div>
            <div>
              <p className="text-4xl font-bold text-gray-900">
                {clarifications.filter(c => c.status === "pending").length}
              </p>
              <p className="text-gray-600">Pending</p>
            </div>
          </div>
          
          <div className="bg-white rounded-lg border border-gray-200 p-6 flex-1">
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
              placeholder="brief subject of your question"
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
            className="w-full text-white font-medium h-12 text-base"
            style={{ backgroundColor: '#2d4817' }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1f3310'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#2d4817'}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit Clarification
          </Button>
        </div>
      </div>

      {/* Clarification History */}
      
    </div>
  );
};

export default ClarificationPanel;
