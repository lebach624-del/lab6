"use client"

import { useCart } from "@/context/CartContext"
import { supabase } from "@/lib/supabase"
import { useState } from "react"
import { motion } from "framer-motion"
import { CreditCard, CheckCircle2, ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * (item.quantity || 1),
    0
  )

  const handleCheckout = async () => {
    setLoading(true)
    try {
      const { data: { session } } = await supabase.auth.getSession()
      const user = session?.user

      if (!user) {
        alert("Please login to complete your purchase")
        router.push("/login")
        return
      }

      const { error } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_price: total,
          items: cart,
          status: 'pending'
        })

      if (error) throw error

      setSuccess(true)
      clearCart()
      setTimeout(() => {
        router.push("/orders")
      }, 3000)

    } catch (error: any) {
      alert("Checkout failed: " + error.message)
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-6">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-6"
        >
          <div className="h-24 w-24 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight">Order Placed!</h1>
          <p className="text-muted-foreground text-lg max-w-sm mx-auto">
            Thank you for your purchase. We&apos;ve received your order and are processing it now.
          </p>
          <div className="pt-8">
            <Link href="/orders">
              <Button size="lg" className="rounded-full px-8">View My Orders</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="container mx-auto px-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Checkout.</h1>
        </div>

        <div className="glass border border-white/20 rounded-3xl p-8 space-y-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">Order Summary</h3>
            <div className="space-y-3">
              {cart.map((item: any) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground font-medium">{item.quantity}x</span>
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">${item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <hr className="border-white/10" />
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              onClick={handleCheckout} 
              disabled={loading || cart.length === 0}
              className="w-full rounded-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" /> Pay Now
                </>
              )}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-4">
              By placing your order, you agree to our Terms of Service.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}