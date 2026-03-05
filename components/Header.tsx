"use client"

import Link from "next/link"

export default function Header(){

  const cart = JSON.parse(localStorage.getItem("cart") || "[]")

  const total = cart.reduce(
    (sum:any,item:any)=> sum + item.quantity,
    0
  )

  return(
    <div className="flex justify-between items-center p-6 border-b">

      <Link href="/">
        <h1 className="text-2xl font-bold">
          My Shop
        </h1>
      </Link>

      <div className="flex gap-6">

        <Link href="/cart">
          Cart ({total})
        </Link>

        <Link href="/orders">
          Orders
        </Link>

        <Link href="/login">
          Login
        </Link>

      </div>

    </div>
  )
}