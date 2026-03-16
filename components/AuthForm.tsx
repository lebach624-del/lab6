"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const login = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        alert("Login failed: " + error.message)
      } else {
        alert("Login success!")
        router.push("/")
        router.refresh()
      }
    } catch (err: any) {
      alert("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const signup = async () => {
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        alert("Signup failed: " + error.message)
      } else {
        alert("Signup success! Please check your email for verification.")
      }
    } catch (err: any) {
      alert("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      <input
        placeholder="Email"
        className="border p-2 w-full rounded"
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full rounded"
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
      />

      <button
        onClick={login}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white p-2 w-full rounded transition-colors"
      >
        {loading ? "Logging in..." : "Login"}
      </button>

      <button
        onClick={signup}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white p-2 w-full rounded transition-colors"
      >
        {loading ? "Signing up..." : "Sign Up"}
      </button>
    </div>
  )
}