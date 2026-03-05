"use client"

import { useCart } from "@/context/CartContext"
import { useState } from "react"
import Link from "next/link"

const products = [
  { id: 1, name: "iPhone 17", price: 999, img: "https://cdn1.viettelstore.vn/Images/Product/ProductImage/1834064111.jpeg" },
  { id: 2, name: "MacBook Air", price: 1199, img: "https://image.anhducdigital.vn/di-dong/may-tinh/macbook/macbook-pro/macbook-pro-m1-2020/macbook-pro-m1-2020-4-500x500.jpg" },
  { id: 3, name: "AirPods Pro", price: 249, img: "https://cdn1.viettelstore.vn/Images/Product/ProductImage/284192904.jpeg" },
]

export default function Home() {
  const { addToCart } = useCart()
  const [qty, setQty] = useState(1)

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>

      <h1 style={{ textAlign: "center", marginBottom: 40 }}>
        Apple Store
      </h1>

      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <Link href="/cart" style={{
          padding: "10px 20px",
          background: "black",
          color: "white",
          borderRadius: 6,
          textDecoration: "none"
        }}>
          Cart
        </Link>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: 30
      }}>

        {products.map((p) => (
          <div key={p.id} style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 20,
            textAlign: "center",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>

            <img src={p.img} style={{ width: "150px", marginBottom: 20 }} />

            <h2>{p.name}</h2>

            <p style={{
              fontSize: 18,
              fontWeight: "bold",
              marginBottom: 15
            }}>
              ${p.price}
            </p>

            <input
              type="number"
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              style={{
                width: 60,
                padding: 5,
                marginRight: 10
              }}
            />

            <button
              onClick={() => addToCart(p, qty)}
              style={{
                padding: "8px 15px",
                background: "#0071e3",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer"
              }}
            >
              Add to Cart
            </button>

          </div>
        ))}

      </div>
    </div>
  )
}