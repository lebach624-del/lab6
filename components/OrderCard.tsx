"use client"

export default function OrderCard({ order }: any) {
  return (
    <div className="border p-4 rounded mb-4">

      <p><b>Order ID:</b> {order.id}</p>

      <p><b>Total:</b> ${order.total_price}</p>

      <p><b>Status:</b> {order.status}</p>

      <p><b>Date:</b> {new Date(order.created_at).toLocaleString()}</p>

    </div>
  )
}