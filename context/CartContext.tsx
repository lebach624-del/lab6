"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: string | number
  name: string
  price: number
  img: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (product: CartItem | any, quantity: number) => void
  removeFromCart: (id: string | number) => void
  clearCart: () => void
  totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isMounted, setIsMounted] = useState(false)

  // Load from localStorage only on mount to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true)
    const savedCart = localStorage.getItem("luxury_cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e)
      }
    }
  }, [])

  // Save to localStorage when cart changes
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem("luxury_cart", JSON.stringify(cart))
    }
  }, [cart, isMounted])

  const addToCart = (product: any, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, (item.quantity || 0) + quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    if (typeof window !== "undefined") {
      localStorage.removeItem("luxury_cart")
    }
  }

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}