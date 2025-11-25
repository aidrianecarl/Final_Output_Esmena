"use client"

import { useState, useMemo } from "react"
import { useProducts } from "@/context/product-context"
import StarRating from "./star-rating"
import ProductCard from "./product-card"
import { Pagination } from "@/components/ui/pagination"

interface ProductDetailProps {
  productId: string
}

const RELATED_PRODUCTS_PER_PAGE = 4

export default function ProductDetail({ productId }: ProductDetailProps) {
  const { products, addToCart } = useProducts()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const relatedProducts = useMemo(() => {
    return products.filter((p) => p.category === product.category && p.id !== productId)
  }, [products, productId])

  const product = products.find((p) => p.id === productId)
  const isLowStock = product ? product.quantity < 5 : false

  const totalPages = Math.ceil(relatedProducts.length / RELATED_PRODUCTS_PER_PAGE)
  const paginatedRelated = relatedProducts.slice(
    (currentPage - 1) * RELATED_PRODUCTS_PER_PAGE,
    currentPage * RELATED_PRODUCTS_PER_PAGE,
  )

  const handleAddToCart = () => {
    addToCart(product, quantity)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">Product not found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-500">
      {/* Product Detail Section */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Large Image */}
        <div className="flex items-center justify-center">
          <div className="w-full aspect-square bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 rounded-2xl overflow-hidden flex items-center justify-center shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <div className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {product.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{product.name}</h1>
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} size="lg" />
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wide">Price</p>
            <p className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wide">Description</p>
            <p className="text-foreground text-lg leading-relaxed">{product.description}</p>
          </div>

          {/* Specification */}
          <div className="space-y-2">
            <p className="text-muted-foreground text-sm uppercase tracking-wide">Specifications</p>
            <div className="bg-muted p-4 rounded-lg border border-border">
              <p className="text-foreground font-medium">{product.specification}</p>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-900/50">
            <div className={`w-3 h-3 rounded-full ${isLowStock ? "bg-red-500 animate-pulse" : "bg-green-500"}`} />
            <p
              className={`font-medium ${isLowStock ? "text-red-600 dark:text-red-400" : "text-green-600 dark:text-green-400"}`}
            >
              {isLowStock ? `Only ${product.quantity} left in stock` : `${product.quantity} in stock`}
            </p>
          </div>

          {/* Add to Cart and Buy Now Section */}
          <div className="flex flex-col gap-3 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center border-2 border-border rounded-lg overflow-hidden bg-background">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 py-3 hover:bg-muted transition-colors text-lg font-bold"
                >
                  −
                </button>
                <span className="px-8 py-3 text-lg font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                  className="px-5 py-3 hover:bg-muted transition-colors text-lg font-bold"
                >
                  +
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={product.quantity === 0}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all duration-300 ${
                isAdded
                  ? "bg-green-500 shadow-lg shadow-green-500/30"
                  : product.quantity === 0
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95"
              }`}
            >
              {isAdded ? "✓ Added to Cart" : "Add to Cart"}
            </button>

            <button className="w-full py-4 rounded-lg font-bold text-white text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:shadow-xl hover:shadow-purple-500/30 hover:scale-105 active:scale-95 transition-all duration-300">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-border pt-12">
          <h2 className="text-3xl font-bold text-foreground mb-8">Related Products</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {paginatedRelated.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      )}
    </div>
  )
}
