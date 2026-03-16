import { CartProvider } from "@/context/CartContext"
import ChatWidget from "@/components/ChatWidget"
import Header from "@/components/Header"
import "./globals.css"

export default function RootLayout({ children }: any) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CartProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <ChatWidget />
        </CartProvider>
      </body>
    </html>
  )
}