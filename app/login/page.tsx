import AuthForm from "@/components/AuthForm"
import { Apple } from "lucide-react"
import Link from "next/link"

export default function Login() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-6 hover:opacity-80 transition-opacity">
            <Apple className="h-10 w-10 text-primary" />
          </Link>
          <h1 className="text-3xl font-bold tracking-tight">Welcome Back</h1>
          <p className="mt-2 text-muted-foreground">Sign in to your Apple ID to continue</p>
        </div>

        <div className="glass border border-white/20 p-8 rounded-3xl shadow-xl">
          <AuthForm />
        </div>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account? No worries, you can sign up above.
        </p>
      </div>
    </div>
  )
}