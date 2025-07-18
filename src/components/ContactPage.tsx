"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MessageCircle, Phone, ExternalLink } from "lucide-react"

const ContactPage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Helpdesk Contacts Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">Helpdesk Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <Phone className="h-8 w-8 text-green-600 mb-2" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Technical Support</h3>
              <p className="text-sm text-gray-600 mb-4">Platform & Upload Issues</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Call
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">Competition Queries</h3>
              <p className="text-sm text-gray-600 mb-4">Rules & Procedures</p>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* WhatsApp Groups Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">WhatsApp Groups</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-4">General Updates</h3>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Open
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-8 w-8 text-green-600 mb-2" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-4">Technical Support</h3>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Open
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContactPage