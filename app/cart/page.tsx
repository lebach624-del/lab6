"use client"

import { useCart } from "@/context/CartContext"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CartPage() {
  const { cart, removeFromCart, addToCart } = useCart()

  const total = cart.reduce((sum: number, item: any) => {
    const price = Number(item.price)
    const qty = Number(item.quantity || 1)
    return sum + price * qty
  }, 0)

  return (
    <div className="min-h-screen pb-20 pt-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-4 mb-10">
          <Link href="/">
            <Button variant="ghost" size="icon" className="rounded-full">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-4xl font-bold tracking-tight">Your bag.</h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-20 glass rounded-3xl border border-dashed border-white/20">
            <ShoppingBag className="h-16 w-16 mx-auto mb-6 text-muted-foreground opacity-20" />
            <h2 className="text-2xl font-semibold mb-2">Your bag is empty.</h2>
            <p className="text-muted-foreground mb-8">Items you add to your bag will appear here.</p>
            <Link href="/">
              <Button size="lg" className="rounded-full px-8">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cart.map((item: any, index: number) => {
                  const price = Number(item.price)
                  const qty = Number(item.quantity || 1)
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="glass border border-white/20 rounded-3xl p-6 flex gap-6 items-center"
                    >
                      <div className="h-24 w-24 rounded-2xl bg-white/50 flex items-center justify-center overflow-hidden p-2">
                        <img src={item.img} alt={item.name} className="max-h-full object-contain" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-bold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">${price} each</p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border rounded-full bg-white/20 px-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-full"
                              onClick={() => addToCart(item, -1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm font-medium">{qty}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-7 w-7 rounded-full"
                              onClick={() => addToCart(item, 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 text-destructive hover:bg-destructive/10 rounded-full"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg font-bold">${price * qty}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>

            <div className="space-y-6">
              <div className="glass border border-white/20 rounded-3xl p-8 sticky top-24">
                <h3 className="text-xl font-bold mb-6">Summary</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>${total}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>FREE</span>
                  </div>
                  <hr className="border-white/10" />
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>${total}</span>
                  </div>
                </div>
                
                <Button className="w-full rounded-full py-6 text-lg font-semibold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20">
                  <CreditCard className="mr-2 h-5 w-5" /> Check Out
                </Button>
                
                <p className="text-xs text-center text-muted-foreground mt-6 uppercase tracking-widest">
                  Secure Checkout Guaranteed
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}