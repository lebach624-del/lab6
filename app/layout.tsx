import { CartProvider } from "@/context/CartContext"

export default function RootLayout({ children }: any) {
  return (
    <html>
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}