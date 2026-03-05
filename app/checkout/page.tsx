"use client"

import { useCart } from "@/context/CartContext"
import { supabase } from "@/lib/supabase"

export default function CheckoutPage() {
  const { cart, clearCart } = useCart()

  const total = cart.reduce(
    (sum: number, item: any) => sum + item.price * item.qty,
    0
  )

  const handleCheckout = async () => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      alert("Login required")
      return
    }

    const { error } = await supabase
      .from("orders")
      .insert({
        user_id: user.id,
        total_price: total,
        items: cart
      })

    if (error) {
      alert("Checkout failed")
      console.log(error)
      return
    }

    alert("Order success")
    clearCart()
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Checkout</h1>

      {cart.map((item: any, i: number) => (
        <div key={i}>
          {item.name} - {item.qty} x ${item.price}
        </div>
      ))}

      <h2>Total: ${total}</h2>

      <button onClick={handleCheckout}>
        Place Order
      </button>
    </div>
  )
}