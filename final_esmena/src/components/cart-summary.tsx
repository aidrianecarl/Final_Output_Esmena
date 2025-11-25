"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context"
import CartModal from "./cart-modal"

export default function CartSummary() {
  const { cart } = useProducts()
  const [isOpen, setIsOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors group"
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

      <CartModal isOpen={isOpen} onClose={() => setIsOpen(false)} cart={cart} totalPrice={totalPrice} />
    </>
  )
}
