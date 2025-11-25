"use client"

import { useState } from "react"
import Link from "next/link"
import { useProducts } from "@/context/product-context"
import AuthModal from "./auth-modal"
import CartDropdown from "./cart-dropdown"

export default function Navbar() {
  const { user, cart } = useProducts()
  const [authOpen, setAuthOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0)

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ProductHub
              </h1>
            </Link>

            {/* Right side: Cart and Auth */}
            <div className="flex items-center gap-4">
              {/* Cart Dropdown */}
              <CartDropdown totalItems={totalItems} />

              {/* Auth Section */}
              <div className="flex items-center gap-3 pl-4 border-l border-border">
                {user ? (
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Sign In
                  </button>
                )}

                {!user && (
                  <button
                    onClick={() => setAuthOpen(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}
