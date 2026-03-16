"use client"

import { useState, useEffect } from "react"
import { MessageCircle, X, Sparkles } from "lucide-react"
import { Button } from "./ui/button"
import { supabase } from "@/lib/supabase"
import ChatInterface from "./ChatInterface"
import { motion, AnimatePresence } from "framer-motion"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Check active session on mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null)
    })

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null)
      }
    )

    return () => {
      authListener.subscription.unsubscribe()
    }
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 glass border border-white/20 rounded-3xl shadow-2xl w-80 sm:w-96 overflow-hidden flex flex-col"
          >
            <div className="bg-primary text-white p-4 flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-700">
              <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1.5 rounded-lg">
                  <Sparkles className="h-4 w-4" />
                </div>
                <h3 className="font-semibold">AI Assistant</h3>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/10 rounded-full h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="bg-background/50 flex-1 min-h-[400px]">
               {!user ? (
                 <div className="text-center p-8 text-muted-foreground flex flex-col items-center justify-center h-full space-y-4">
                   <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                     <MessageCircle className="h-8 w-8 opacity-20" />
                   </div>
                   <div className="space-y-2">
                     <p className="font-medium text-foreground">Ready to help?</p>
                     <p className="text-sm">Please log in to start a conversation with our AI.</p>
                   </div>
                   <Button onClick={() => window.location.href = '/login'} className="w-full rounded-full">Sign In to Continue</Button>
                 </div>
               ) : (
                 <div className="p-4 h-[450px]">
                   <ChatInterface user={user} />
                 </div>
               )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Button 
        onClick={() => setIsOpen(!isOpen)}
        className={`rounded-full shadow-2xl transition-all duration-300 transform active:scale-95 ${isOpen ? 'h-12 w-12 bg-white text-primary border border-primary/20 hover:bg-gray-50' : 'h-14 w-14 bg-primary text-white hover:shadow-primary/20 shadow-blue-500/50'}`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
