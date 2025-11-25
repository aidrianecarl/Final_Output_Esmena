"use client"

import Link from "next/link"
import { useProducts } from "@/context/product-context"
import Navbar from "@/components/navbar"
import StarRating from "@/components/star-rating"

export default function CartPage() {
  const { cart, removeFromCart, updateCartQuantity } = useProducts()

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.cartQuantity, 0)
  const totalItems = cart.reduce((sum, item) => sum + item.cartQuantity, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900">
      <Navbar />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-8 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </Link>

        {/* Header */}
        <div className="mb-8 animate-in fade-in duration-500">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shopping Cart</h1>
          <p className="text-muted-foreground">
            {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
          </p>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-border">
            <svg
              className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            <p className="text-muted-foreground text-lg mb-6">Your cart is empty</p>
            <Link
              href="/"
              className="inline-block px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 animate-in slide-in-from-left"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/product/${item.id}`}>
                      <div className="w-28 h-28 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-lg overflow-hidden flex-shrink-0 hover:scale-105 transition-transform duration-300">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="text-lg font-bold text-foreground hover:text-blue-600 transition-colors mb-1">
                          {item.name}
                        </h3>
                      </Link>
                      <p className="text-sm text-muted-foreground mb-2">{item.category}</p>

                      {/* Rating */}
                      <div className="mb-3">
                        <StarRating rating={item.rating} size="sm" />
                      </div>

                      <p className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ₱{item.price.toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity and Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors mb-4"
                      >
                        Remove
                      </button>

                      <div className="flex items-center border border-border rounded-lg overflow-hidden bg-background">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                          className="px-3 py-2 hover:bg-muted transition-colors font-bold"
                        >
                          −
                        </button>
                        <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">{item.cartQuantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                          className="px-3 py-2 hover:bg-muted transition-colors font-bold"
                        >
                          +
                        </button>
                      </div>

                      <p className="text-right mt-3 font-bold text-foreground">
                        ₱{(item.price * item.cartQuantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 h-fit">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-border p-6 sticky top-20 shadow-lg animate-in fade-in slide-in-from-right duration-500">
                <h2 className="text-2xl font-bold text-foreground mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₱{totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>₱{(totalPrice * 0.1).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between mb-6">
                  <span className="text-lg font-bold text-foreground">Total</span>
                  <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ₱{(totalPrice * 1.1).toFixed(2)}
                  </span>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 mb-3">
                  Proceed to Checkout
                </button>

                <Link
                  href="/"
                  className="block text-center py-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-bold rounded-lg transition-all duration-300"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
