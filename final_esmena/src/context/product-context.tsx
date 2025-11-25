"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export interface Product {
  id: string
  image: string
  name: string
  category: string
  description: string
  specification: string
  rating: number
  price: number
  quantity: number
}

interface CartItem extends Product {
  cartQuantity: number
}

interface ProductContextType {
  products: Product[]
  cart: CartItem[]
  addProduct: (product: Product) => void
  updateProductQuantity: (id: string, quantity: number) => void
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    image: "/modern-laptop-workspace.png",
    name: 'Pro Laptop 15"',
    category: "Electronics",
    description: "High-performance laptop for professionals",
    specification: "Intel i7, 16GB RAM, 512GB SSD",
    rating: 4.8,
    price: 1299.99,
    quantity: 15,
  },
  {
    id: "2",
    image: "/wireless-headphones.jpg",
    name: "Wireless Headphones Pro",
    category: "Audio",
    description: "Premium noise-cancelling headphones",
    specification: "40-hour battery, ANC, Bluetooth 5.0",
    rating: 4.6,
    price: 349.99,
    quantity: 8,
  },
  {
    id: "3",
    image: "/modern-smartwatch.png",
    name: "SmartWatch Ultra",
    category: "Wearables",
    description: "Feature-rich smartwatch with health tracking",
    specification: "OLED display, 14-day battery, GPS",
    rating: 4.5,
    price: 449.99,
    quantity: 12,
  },
]

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [cart, setCart] = useState<CartItem[]>([])

  const addProduct = (product: Product) => {
    setProducts([...products, { ...product, id: Date.now().toString() }])
  }

  const updateProductQuantity = (id: string, quantity: number) => {
    setProducts(products.map((p) => (p.id === id ? { ...p, quantity: Math.max(0, quantity) } : p)))
  }

  const addToCart = (product: Product, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + quantity } : item,
        )
      }
      return [...prevCart, { ...product, cartQuantity: quantity }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id))
  }

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
    } else {
      setCart(cart.map((item) => (item.id === id ? { ...item, cartQuantity: quantity } : item)))
    }
  }

  return (
    <ProductContext.Provider
      value={{ products, cart, addProduct, updateProductQuantity, addToCart, removeFromCart, updateCartQuantity }}
    >
      {children}
    </ProductContext.Provider>
  )
}

export function useProducts() {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProducts must be used within ProductProvider")
  }
  return context
}
