import Navbar from "@/components/navbar"
import ProductDetail from "@/components/product-detail"
import { ProductProvider } from "@/context/product-context"

export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <ProductProvider>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-slate-50 dark:to-slate-900">
        {/* Header */}
        <Navbar />

        {/* Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors hover:gap-3 duration-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Products
          </a>
          <ProductDetail productId={params.id} />
        </main>
      </div>
    </ProductProvider>
  )
}
