"use client"

import { useState } from "react"
import Link from "next/link"
import { useProducts, type Product } from "@/context/product-context"
import StarRating from "./star-rating"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const isLowStock = product.quantity < 5

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  return (
    <div className="group h-full bg-white dark:bg-slate-800 rounded-xl border border-border hover:border-blue-500/50 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image Container */}
      <Link href={`/products/${product.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {isLowStock && (
            <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
              Low Stock
            </div>
          )}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-blue-600 dark:text-blue-400">
            {product.category}
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col h-[calc(100%-192px)]">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-foreground line-clamp-2 hover:text-blue-600 transition-colors group-hover:underline">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-2">
          <StarRating rating={product.rating} size="sm" />
        </div>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mt-3 mb-3">
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ₱{product.price.toFixed(2)}
          </span>
          <span className="text-xs text-muted-foreground">{product.quantity} in stock</span>
        </div>

        {/* Quantity Selector and Add to Cart */}
        <div className="flex items-center gap-2 mt-auto">
          <div className="flex items-center border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-2 py-1 hover:bg-muted transition-colors"
            >
              −
            </button>
            <span className="px-3 py-1 text-sm font-medium">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
              className="px-2 py-1 hover:bg-muted transition-colors"
            >
              +
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={product.quantity === 0}
            className={`flex-1 py-2 rounded-lg font-medium text-white transition-all duration-300 ${
              isAdded
                ? "bg-green-500 shadow-lg shadow-green-500/30"
                : product.quantity === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105"
            }`}
          >
            {isAdded ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  )
}
