"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useProducts } from "@/context/product-context"

interface CartDropdownProps {
  totalItems: number
}

export default function CartDropdown({ totalItems }: CartDropdownProps) {
  const { cart } = useProducts()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted transition-all duration-300 group"
      >
        <svg
          className="w-6 h-6 text-foreground group-hover:text-blue-600 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          />
        </svg>
        {totalItems > 0 && (
          <span className="absolute top-0 right-0 w-5 h-5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
            {totalItems}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-xl shadow-2xl border border-border animate-in slide-in-from-top duration-200 z-50">
          {cart.length === 0 ? (
            <div className="p-6 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <div className="max-h-64 overflow-y-auto p-4 space-y-3">
                {cart.slice(0, 3).map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.cartQuantity} x ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
                {cart.length > 3 && (
                  <p className="text-center text-xs text-muted-foreground py-2">+{cart.length - 3} more items</p>
                )}
              </div>

              <div className="border-t border-border p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total:</span>
                  <span className="font-bold text-lg text-foreground">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  href="/cart"
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 text-center block"
                >
                  View All Carts
                </Link>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
