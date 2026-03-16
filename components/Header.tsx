"use client"

import Link from "next/link"
import { ShoppingBag, Apple } from "lucide-react"
import { useCart } from "@/context/CartContext"

export default function Header() {
  const { cart } = useCart()
  const totalItems = cart.reduce((acc: number, item: any) => acc + item.quantity, 0)

  return (
    <header className="sticky top-0 z-40 w-full glass">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Apple className="h-6 w-6" />
          <span className="font-bold text-xl tracking-tight">Apple Store</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Store</Link>
          <Link href="/orders" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Orders</Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors">Login</Link>
          <Link href="/cart" className="relative p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )
}