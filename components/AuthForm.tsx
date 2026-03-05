"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AuthForm(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const login = async()=>{

    await supabase.auth.signInWithPassword({
      email,
      password
    })

    alert("Login success")
  }

  const signup = async()=>{

    await supabase.auth.signUp({
      email,
      password
    })

    alert("Signup success")
  }

  return(

    <div className="max-w-md mx-auto">

      <input
        placeholder="Email"
        className="border p-2 w-full"
        onChange={(e)=>setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mt-2"
        onChange={(e)=>setPassword(e.target.value)}
      />

      <button
        onClick={login}
        className="bg-blue-500 text-white p-2 w-full mt-3"
      >
        Login
      </button>

      <button
        onClick={signup}
        className="bg-green-500 text-white p-2 w-full mt-2"
      >
        Sign Up
      </button>

    </div>
  )
}