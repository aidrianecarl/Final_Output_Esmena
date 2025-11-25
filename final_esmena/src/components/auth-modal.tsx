"use client"

import type React from "react"

import { useState } from "react"
import { useProducts } from "@/context/product-context"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { setUser } = useProducts()
  const [mode, setMode] = useState<"signin" | "signup">("signin")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    setTimeout(() => {
      if (mode === "signin") {
        setUser({
          id: "1",
          email,
          name: email.split("@")[0],
        })
      } else {
        setUser({
          id: "1",
          email,
          name: name || email.split("@")[0],
        })
      }
      setLoading(false)
      onClose()
      setEmail("")
      setPassword("")
      setName("")
    }, 800)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-2xl animate-in fade-in duration-300 scale-in">
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 hover:bg-muted rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8 animate-in slide-in-from-top duration-300">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              {mode === "signin" ? "Welcome Back" : "Join Us"}
            </h2>
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? "Sign in to your account" : "Create your account to get started"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 animate-in slide-in-from-bottom duration-300">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 disabled:opacity-70"
            >
              {loading ? "Processing..." : mode === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center border-t border-border pt-6 animate-in slide-in-from-bottom duration-500 delay-100">
            <p className="text-sm text-muted-foreground">
              {mode === "signin" ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={() => {
                  setMode(mode === "signin" ? "signup" : "signin")
                  setEmail("")
                  setPassword("")
                  setName("")
                }}
                className="ml-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
              >
                {mode === "signin" ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
