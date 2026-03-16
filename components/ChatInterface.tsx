"use client"

import { useState, useEffect, useRef } from "react"
import { Send } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { ScrollArea } from "./ui/scroll-area"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { supabase } from "@/lib/supabase"

type Message = {
  id: string;
  content: string;
  sender_type: 'user' | 'ai';
  created_at: string;
}

export default function ChatInterface({ user }: { user: any }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch initial messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
      
      if (data) setMessages(data)
    }
    
    fetchMessages()
  }, [user.id])

  // Subscribe to real-time events from Supabase
  useEffect(() => {
    const subscription = supabase
      .channel(`public:messages:user_id=${user.id}`)
      .on('postgres_changes', 
        { event: 'INSERT', schema: 'public', table: 'messages', filter: `user_id=eq.${user.id}` }, 
        (payload) => {
          setMessages((prev) => {
            if (prev.some(m => m.id === payload.new.id)) return prev;
            return [...prev, payload.new as Message]
          })
        }
      ).subscribe()

    return () => {
      supabase.removeChannel(subscription)
    }
  }, [user.id])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // Auto scroll on new messages
  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const generateAIResponse = async (userMsg: string) => {
    setIsTyping(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const lowerMsg = userMsg.toLowerCase()
    let aiText = "Tôi là trợ lý ảo của bạn. Tôi có thể giúp gì cho bạn về các sản phẩm của chúng tôi hôm nay?"
    
    if (lowerMsg.includes("giá") || lowerMsg.includes("bao nhiêu") || lowerMsg.includes("price") || lowerMsg.includes("cost")) {
      aiText = "Sản phẩm của chúng tôi có giá từ $10 đến $500 tùy thuộc vào danh mục. Bạn đang quan tâm đến sản phẩm cụ thể nào không?"
    } else if (lowerMsg.includes("giao hàng") || lowerMsg.includes("vận chuyển") || lowerMsg.includes("shipping") || lowerMsg.includes("delivery")) {
      aiText = "Chúng tôi miễn phí giao hàng tiêu chuẩn cho đơn hàng trên $50. Giao hàng hỏa tốc mất khoảng 2 ngày làm việc."
    } else if (lowerMsg.includes("chào") || lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
      aiText = "Xin chào! Chào mừng bạn đến với cửa hàng của chúng tôi. Tôi có thể giúp gì cho bạn hôm nay?"
    } else {
      aiText = "Cảm ơn bạn đã hỏi! Chúng tôi đang có rất nhiều mặt hàng tuyệt vời trong kho. Bạn có thể kiểm tra danh mục hiện tại để biết thêm chi tiết."
    }

    const { data } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        content: aiText,
        sender_type: 'ai'
      })
      .select()
      .single()
      
    if (data) {
       setMessages(prev => {
         if (prev.some(m => m.id === data.id)) return prev;
         return [...prev, data]
       })
    }
    setIsTyping(false)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    const msgText = newMessage.trim()
    setNewMessage("")
    
    const { data } = await supabase
      .from('messages')
      .insert({
        user_id: user.id,
        content: msgText,
        sender_type: 'user'
      })
      .select()
      .single()

    if (data) {
       setMessages(prev => {
         if (prev.some(m => m.id === data.id)) return prev;
         return [...prev, data]
       })
       generateAIResponse(msgText)
    }
  }

  return (
    <div className="flex flex-col h-full bg-white rounded-md overflow-hidden">
      <ScrollArea className="flex-1 px-4 mb-4">
        <div className="flex flex-col gap-3 py-4">
          {messages.length === 0 && (
            <div className="text-center text-gray-400 text-sm my-4">Chưa có tin nhắn nào. Hãy bắt đầu cuộc trò chuyện!</div>
          )}
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-2 ${message.sender_type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="w-8 h-8 border">
                {message.sender_type === 'user' ? (
                  <AvatarFallback className="bg-blue-100 text-blue-700 text-xs">Tôi</AvatarFallback>
                ) : (
                  <AvatarFallback className="bg-green-100 text-green-700 text-xs">AI</AvatarFallback>
                )}
              </Avatar>
              <div 
                className={`px-3 py-2 rounded-2xl text-sm max-w-[80%] ${
                  message.sender_type === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-muted text-foreground rounded-tl-none'
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex items-start gap-2 flex-row">
              <Avatar className="w-8 h-8 border">
                <AvatarFallback className="bg-green-100 text-green-700 text-xs text-black">AI</AvatarFallback>
              </Avatar>
              <div className="px-3 py-2 rounded-lg text-sm bg-white border text-gray-500 rounded-tl-none flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Nhập tin nhắn..."
          className="flex-1"
          disabled={isTyping}
        />
        <Button type="submit" size="icon" disabled={!newMessage.trim() || isTyping} className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  )
}
