"use client"

import { useState } from "react"
import { useProducts } from "@/context/product-context"

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { products, addToCart } = useProducts()
  const product = products.find((p) => p.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Product not found.</p>
      </div>
    )
  }

  const isLowStock = product.quantity < 5

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 lg:gap-12 animate-in fade-in duration-500">
      {/* Image */}
      <div className="flex items-center justify-center">
        <div className="w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-6">
        <div>
          <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold mb-3">
            {product.category}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">{product.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(product.rating) ? "★" : "☆"}>
                  {""}
                </span>
              ))}
            </div>
            <span className="text-muted-foreground">({product.rating} out of 5)</span>
          </div>
        </div>

        {/* Price */}
        <div className="space-y-2">
          <p className="text-muted-foreground">Price</p>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ${product.price.toFixed(2)}
          </p>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-muted-foreground">Description</p>
          <p className="text-foreground text-lg leading-relaxed">{product.description}</p>
        </div>

        {/* Specification */}
        <div className="space-y-2">
          <p className="text-muted-foreground">Specifications</p>
          <p className="text-foreground bg-muted p-4 rounded-lg">{product.specification}</p>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className={`w-3 h-3 rounded-full ${isLowStock ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
          <p
            className={`font-medium ${isLowStock ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
          >
            {isLowStock ? `Only ${product.quantity} left in stock` : `${product.quantity} in stock`}
          </p>
        </div>

        {/* Add to Cart Section */}
        <div className="flex items-center gap-3 pt-4">
          <div className="flex items-center border-2 border-border rounded-lg overflow-hidden bg-background">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-muted transition-colors text-lg font-bold"
            >
              −
            </button>
            <span className="px-6 py-2 text-lg font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              className="px-4 py-2 hover:bg-muted transition-colors text-lg font-bold"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`flex-1 py-3 rounded-lg font-bold text-white text-lg transition-all duration-300 ${
              isAdded
                ? "bg-green-500 shadow-lg shadow-green-500/30"
                : product.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
            }`}
          >
            {isAdded ? "✓ Added to Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}
