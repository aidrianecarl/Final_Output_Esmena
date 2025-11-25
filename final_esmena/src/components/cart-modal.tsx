"use client"

import { useProducts, type Product } from "@/context/product-context"

interface CartItem extends Product {
  cartQuantity: number
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  totalPrice: number
}

export default function CartModal({ isOpen, onClose, cart, totalPrice }: CartModalProps) {
  const { removeFromCart, updateCartQuantity } = useProducts()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white dark:bg-slate-800 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-bold text-foreground">Shopping Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-muted/50 p-4 rounded-lg">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground text-sm">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">₱{item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)}
                      className="px-2 py-1 text-xs hover:bg-background rounded transition-colors"
                    >
                      −
                    </button>
                    <span className="text-xs font-medium">{item.cartQuantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)}
                      className="px-2 py-1 text-xs hover:bg-background rounded transition-colors"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-xs text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1 rounded transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-border p-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-bold text-lg text-foreground">₱{totalPrice.toFixed(2)}</span>
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
