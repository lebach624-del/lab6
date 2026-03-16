"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext<any>(null)

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([])

  // Store cart in localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("luxury_cart")
    if (savedCart) setCart(JSON.parse(savedCart))
  }, [])

  useEffect(() => {
    if (cart.length >= 0) {
      localStorage.setItem("luxury_cart", JSON.stringify(cart))
    }
  }, [cart])

  const addToCart = (product: any, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: Math.max(0, item.quantity + quantity) }
            : item
        ).filter(item => item.quantity > 0)
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (id: any) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem("luxury_cart")
  }

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 0), 0)

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)