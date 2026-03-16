"use client"

import { useCart } from "@/context/CartContext"
import { useState } from "react"
import { motion } from "framer-motion"
import { ShoppingCart, ArrowRight, Star, ShieldCheck, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"

const products = [
  { 
    id: 1, 
    name: "iPhone 16 Pro", 
    description: "Built for Apple Intelligence. Titaniun design.",
    price: 999, 
    img: "https://cdn1.viettelstore.vn/Images/Product/ProductImage/1834064111.jpeg",
    featured: true
  },
  { 
    id: 2, 
    name: "MacBook Air M3", 
    description: "Lean. Mean. M3 machine.",
    price: 1099, 
    img: "https://image.anhducdigital.vn/di-dong/may-tinh/macbook/macbook-pro/macbook-pro-m1-2020/macbook-pro-m1-2020-4-500x500.jpg",
    featured: false
  },
  { 
    id: 3, 
    name: "AirPods Pro 2", 
    description: "Now with 2x more Active Noise Cancellation.",
    price: 249, 
    img: "https://cdn1.viettelstore.vn/Images/Product/ProductImage/284192904.jpeg",
    featured: false
  },
]

export default function Home() {
  const { addToCart } = useCart()

  return (
    <main className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-black text-white px-6">
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
          >
            Intelligence in Action.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            Discover the future with our most powerful lineup ever. Pre-order yours today and experience the extraordinary.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" className="rounded-full px-8 bg-blue-600 hover:bg-blue-700 text-white">
              Buy Now <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 border-white/20 hover:bg-white/10 text-white">
              Learn More
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-b bg-muted/30">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Free Delivery</h4>
              <p className="text-sm text-muted-foreground">On all orders over $999</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">2 Year Warranty</h4>
              <p className="text-sm text-muted-foreground">Certified Apple protection</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
              <Star className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold">Apple Care+</h4>
              <p className="text-sm text-muted-foreground">Premium support available</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="py-24 container mx-auto px-6">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">The Best of Apple.</h2>
            <p className="text-muted-foreground">Choose the perfect device for your lifestyle.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {products.map((p) => (
            <motion.div 
              key={p.id}
              whileHover={{ y: -5 }}
              className="group relative bg-card border rounded-3xl p-8 transition-all hover:shadow-2xl hover:shadow-primary/5 luxury-card"
            >
              <div className="aspect-square relative mb-8 flex items-center justify-center">
                <img 
                  src={p.img} 
                  alt={p.name}
                  className="max-h-full max-w-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">{p.name}</h3>
                <p className="text-muted-foreground text-sm line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between pt-4">
                  <span className="text-xl font-semibold">${p.price}</span>
                  <Button 
                    variant="secondary"
                    size="sm"
                    className="rounded-full"
                    onClick={() => addToCart({ ...p, price: p.price }, 1)}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  )
}