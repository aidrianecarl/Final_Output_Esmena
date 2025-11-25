"use client"

import { useState } from "react"
import Navbar from "@/components/navbar"
import ProductList from "@/components/product-list"
import AddProductForm from "@/components/add-product-form"
import { ProductProvider } from "@/context/product-context"

export default function Home() {
  const [activeTab, setActiveTab] = useState<"products" | "add">("products")

  return (
    <ProductProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900">
        <Navbar />

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
