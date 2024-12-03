"use client"

import * as React from "react"
import { X, Copy, Send } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

interface EmailPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EmailPopup({ open, onOpenChange }: EmailPopupProps) {
  const [message, setMessage] = React.useState("")
  const email = "michellelawsonmedia@gmail.com"

  const handleSend = () => {
    window.location.href = `mailto:${email}?body=${encodeURIComponent(message)}`
    onOpenChange(false)
    setMessage("")
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email)
    toast({
      title: "Email copied to clipboard",
      description: email,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle>Send Email</DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <span>To:</span>
            <span className="font-medium">{email}</span>
            <Button variant="outline" size="icon" onClick={handleCopyEmail}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="Type your message here."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="bg-gray-800 text-white"
          />
        </div>
        <Button onClick={handleSend} className="w-full">
          <Send className="mr-2 h-4 w-4" /> Send Email
        </Button>
      </DialogContent>
    </Dialog>
  )
}

