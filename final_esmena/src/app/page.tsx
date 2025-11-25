"use client"

import { useState } from "react"
import ProductList from "@/components/product-list"
import AddProductForm from "@/components/add-product-form"
import CartSummary from "@/components/cart-summary"
import { ProductProvider } from "@/context/product-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"products" | "add">("products")

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  ProductHub
                </h1>
              </div>
              <CartSummary />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex gap-2 border-b border-border">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-3 font-medium text-sm transition-all duration-300 relative ${
                activeTab === "products"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Products
              {activeTab === "products" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              )}
            </button>
            <button
              onClick={() => setActiveTab("add")}
              className={`px-4 py-3 font-medium text-sm transition-all duration-300 relative ${
                activeTab === "add" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Add Product
              {activeTab === "add" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full" />
              )}
            </button>
          </div>
        </div>

        {/* Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {activeTab === "products" && <ProductList />}
          {activeTab === "add" && <AddProductForm onSuccess={() => setActiveTab("products")} />}
        </main>
      </div>
    </ProductProvider>
  )
}
