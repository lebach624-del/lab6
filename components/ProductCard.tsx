"use client"

import { useState } from "react"
import { useCart } from "@/context/CartContext"
import { Button } from "./ui/button"
import { ShoppingCart, Plus, Minus } from "lucide-react"

interface Product {
  id: string | number
  name: string
  price: number
  img: string
}

export default function ProductCard({ product }: { product: Product }) {
  const [qty, setQty] = useState(1)
  const { addToCart } = useCart()

  return (
    <div className="luxury-card rounded-3xl p-6 flex flex-col items-center text-center group">
      <div className="aspect-square w-full mb-6 flex items-center justify-center overflow-hidden rounded-2xl bg-muted/30">
        <img 
          src={product.img} 
          alt={product.name}
          className="max-h-[160px] object-contain transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 space-y-2 mb-6">
        <h2 className="text-xl font-bold tracking-tight">{product.name}</h2>
        <p className="text-2xl font-semibold text-primary">${product.price}</p>
      </div>

      <div className="flex items-center gap-3 w-full">
        <div className="flex items-center border rounded-full bg-muted/20 px-2 shrink-0">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full"
            onClick={() => setQty(Math.max(1, qty - 1))}
          >
            <Minus className="h-3 w-3" />
          </Button>
          <span className="w-8 text-sm font-medium">{qty}</span>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 rounded-full hover:text-primary"
            onClick={() => setQty(qty + 1)}
          >
            <Plus className="h-3 w-3" />
          </Button>
        </div>
        
        <Button 
          onClick={() => addToCart(product, qty)}
          className="flex-1 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20"
        >
          <ShoppingCart className="mr-2 h-4 w-4" /> Add
        </Button>
      </div>
    </div>
  )
}