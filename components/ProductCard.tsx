"use client"

import { useState } from "react"

export default function ProductCard({ product }: any) {

  const [qty, setQty] = useState(1)

  const addToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const exist = cart.find((p:any) => p.id === product.id)

    if (exist) {
      exist.quantity += qty
    } else {
      cart.push({
        ...product,
        quantity: qty
      })
    }

    localStorage.setItem("cart", JSON.stringify(cart))

    alert("Added to cart")
  }

  return (

    <div className="border p-4 rounded">

      <h2 className="text-lg font-bold">{product.name}</h2>

      <p>${product.price}</p>

      <input
        type="number"
        value={qty}
        onChange={(e)=>setQty(Number(e.target.value))}
        className="border p-1 w-16"
      />

      <button
        onClick={addToCart}
        className="bg-blue-500 text-white px-3 py-1 ml-2 rounded"
      >
        Add to Cart
      </button>

    </div>
  )
}