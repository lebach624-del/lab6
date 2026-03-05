"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("cart") || "[]")
    setCart(data)
  }, [])

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price)
    const qty = Number(item.qty || item.quantity || 1)

    return sum + price * qty
  }, 0)

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      
      <h1 style={{ marginBottom: 30 }}>🛒 Your Cart</h1>

      {cart.length === 0 && <p>Cart is empty</p>}

      {cart.map((item, index) => {

        const price = Number(item.price)
        const qty = Number(item.qty || item.quantity || 1)
        const subtotal = price * qty

        return (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 20,
              marginBottom: 15,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
            }}
          >
            <div>
              <h3>{item.name}</h3>
              <p>${price} x {qty}</p>
            </div>

            <h3>${subtotal}</h3>
          </div>
        )
      })}

      {cart.length > 0 && (
        <>
          <hr style={{ margin: "30px 0" }} />

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            
            <h2>Total: ${total}</h2>

            <Link href="/checkout">
              <button
                style={{
                  background: "#2563eb",
                  color: "white",
                  padding: "12px 25px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: 16
                }}
              >
                Checkout
              </button>
            </Link>

          </div>
        </>
      )}

    </div>
  )
}