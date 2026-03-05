"use client"

export default function CartItem({ item, updateCart }: any) {

  const changeQty = (amount:number) => {

    const cart = JSON.parse(localStorage.getItem("cart") || "[]")

    const product = cart.find((p:any) => p.id === item.id)

    if(product){
      product.quantity += amount
    }

    localStorage.setItem("cart", JSON.stringify(cart))
    updateCart(cart)
  }

  return (
    <div className="border p-4 mb-4 flex justify-between">

      <div>
        <h2>{item.name}</h2>
        <p>${item.price}</p>
        <p>Quantity: {item.quantity}</p>
      </div>

      <div className="flex gap-2">
        <button onClick={()=>changeQty(1)}>+</button>
        <button onClick={()=>changeQty(-1)}>-</button>
      </div>

    </div>
  )
}