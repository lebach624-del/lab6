"use client"

import { Calendar, Package, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  created_at: string
  status: string
  total_price: number
  items?: any[]
}

export default function OrderCard({ order }: { order: Order }) {
  const date = new Date(order.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  })

  return (
    <div className="glass border border-white/20 rounded-3xl p-6 hover:border-primary/30 transition-all group">
      <div className="flex flex-col md:flex-row justify-between gap-6">
        <div className="flex gap-4">
          <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
            <Package className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-bold text-lg">Order #{order.id.slice(0, 8)}</h3>
              <Badge variant={order.status === 'completed' ? 'default' : 'secondary'} className="rounded-full capitalize">
                {order.status}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </span>
              <span>•</span>
              <span>{order.items?.length || 0} items</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between md:justify-end gap-10">
          <div className="text-right">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Total</p>
            <p className="text-2xl font-bold">${order.total_price}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors hidden md:block" />
        </div>
      </div>
    </div>
  )
}