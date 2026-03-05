"use client"

import { createContext, useContext, useState } from "react"

const CartContext = createContext<any>(null)

export function CartProvider({ children }: any) {
  const [cart, setCart] = useState<any[]>([])

  const addToCart = (product: any, qty: number) => {
    setCart([...cart, { ...product, qty }])
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)