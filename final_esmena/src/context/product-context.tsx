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

interface User {
  id: string
  email: string
  name: string
}

interface ProductContextType {
  products: Product[]
  cart: CartItem[]
  user: User | null
  addProduct: (product: Product) => void
  updateProductQuantity: (id: string, quantity: number) => void
  addToCart: (product: Product, quantity: number) => void
  removeFromCart: (id: string) => void
  updateCartQuantity: (id: string, quantity: number) => void
  setUser: (user: User | null) => void
}

const ProductContext = createContext<ProductContextType | undefined>(undefined)

const defaultProducts: Product[] = [
  {
    id: "1",
    image: "/professional-laptop-computer.jpg",
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
    image: "/wireless-headphones-audio.jpg",
    name: "Wireless Headphones Pro",
    category: "Audio",
    description: "Premium noise-cancelling headphones",
    specification: "40-hour battery, ANC, Bluetooth 5.0",
    rating: 4.6,
    price: 349.99,
    quantity: 3,
  },
  {
    id: "3",
    image: "/smartwatch-fitness-tracker.png",
    name: "SmartWatch Ultra",
    category: "Wearables",
    description: "Feature-rich smartwatch with health tracking",
    specification: "OLED display, 14-day battery, GPS",
    rating: 4.5,
    price: 449.99,
    quantity: 12,
  },
  {
    id: "4",
    image: "/wireless-earbuds-compact.jpg",
    name: "TWS Earbuds Pro",
    category: "Audio",
    description: "True wireless stereo with active noise cancellation",
    specification: "8-hour battery, ANC, IPX4",
    rating: 4.7,
    price: 199.99,
    quantity: 25,
  },
  {
    id: "5",
    image: "/gaming-mouse-rgb.jpg",
    name: "Gaming Mouse RGB",
    category: "Electronics",
    description: "Professional gaming mouse with RGB lighting",
    specification: "16000 DPI, Wireless, RGB",
    rating: 4.4,
    price: 89.99,
    quantity: 30,
  },
  {
    id: "6",
    image: "/mechanical-keyboard-gaming.jpg",
    name: "Mechanical Keyboard",
    category: "Electronics",
    description: "Premium mechanical gaming keyboard",
    specification: "RGB switches, Wireless, Programmable",
    rating: 4.9,
    price: 179.99,
    quantity: 18,
  },
  {
    id: "7",
    image: "/fitness-tracker-band.jpg",
    name: "Fitness Tracker Band",
    category: "Wearables",
    description: "Lightweight fitness tracking band",
    specification: "Heart rate, Steps, Sleep tracking",
    rating: 4.3,
    price: 79.99,
    quantity: 20,
  },
  {
    id: "8",
    image: "/portable-speaker-bluetooth.jpg",
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    description: "Waterproof portable speaker with deep bass",
    specification: "20-hour battery, 360° sound, Waterproof",
    rating: 4.6,
    price: 129.99,
    quantity: 22,
  },
  {
    id: "9",
    image: "/tablet-device-screen.jpg",
    name: "Pro Tablet 12.9",
    category: "Electronics",
    description: "High-end tablet for work and entertainment",
    specification: "A15 Bionic, 256GB, ProMotion 120Hz",
    rating: 4.8,
    price: 799.99,
    quantity: 10,
  },
  {
    id: "10",
    image: "/camera-smart-video.jpg",
    name: "4K Smart Camera",
    category: "Electronics",
    description: "Ultra HD action camera with stabilization",
    specification: "4K 60fps, Image stabilization, Waterproof",
    rating: 4.7,
    price: 399.99,
    quantity: 14,
  },
  {
    id: "11",
    image: "/smartwatch-elegant-design.jpg",
    name: "Elegance SmartWatch",
    category: "Wearables",
    description: "Stylish smartwatch with fashion focus",
    specification: "AMOLED display, 5-day battery, NFC",
    rating: 4.5,
    price: 279.99,
    quantity: 16,
  },
  {
    id: "12",
    image: "/studio-microphone-professional.jpg",
    name: "Studio Microphone Pro",
    category: "Audio",
    description: "Professional studio recording microphone",
    specification: "Condenser, 48V phantom power, USB",
    rating: 4.8,
    price: 249.99,
    quantity: 11,
  },
  {
    id: "13",
    image: "/webcam-hd-crystal-clear.jpg",
    name: "HD Webcam 1080p",
    category: "Electronics",
    description: "Crystal clear HD webcam for streaming",
    specification: "1080p 60fps, Auto-focus, USB plug-and-play",
    rating: 4.4,
    price: 69.99,
    quantity: 28,
  },
  {
    id: "14",
    image: "/noise-cancelling-travel-pillow.jpg",
    name: "Travel Headphones Compact",
    category: "Audio",
    description: "Compact foldable travel headphones",
    specification: "30-hour battery, ANC, Compact design",
    rating: 4.5,
    price: 159.99,
    quantity: 19,
  },
  {
    id: "15",
    image: "/wireless-charger-pad.jpg",
    name: "Multi-Device Charger",
    category: "Electronics",
    description: "Charge multiple devices simultaneously",
    specification: "3-in-1 charging pad, 30W, Wireless",
    rating: 4.6,
    price: 49.99,
    quantity: 35,
  },
  {
    id: "16",
    image: "/sports-earbuds-waterproof.jpg",
    name: "Sports Earbuds",
    category: "Audio",
    description: "Waterproof earbuds for active lifestyle",
    specification: "IPX7 waterproof, 8-hour battery, Secure fit",
    rating: 4.7,
    price: 139.99,
    quantity: 24,
  },
  {
    id: "17",
    image: "/smartwatch-kids-children.jpg",
    name: "Kids SmartWatch",
    category: "Wearables",
    description: "Fun smartwatch designed for kids",
    specification: "Kid-safe features, GPS tracking, Durable",
    rating: 4.3,
    price: 99.99,
    quantity: 17,
  },
  {
    id: "18",
    image: "/monitor-curved-gaming.jpg",
    name: "Curved Gaming Monitor",
    category: "Electronics",
    description: "Immersive 144Hz curved gaming monitor",
    specification: "27inch, 144Hz, 1ms response, Curved",
    rating: 4.8,
    price: 349.99,
    quantity: 9,
  },
  {
    id: "19",
    image: "/earbuds-case-stylish.jpg",
    name: "Premium Earbuds Case",
    category: "Audio",
    description: "Protective and stylish earbuds case",
    specification: "Premium materials, AirTag compatible",
    rating: 4.5,
    price: 39.99,
    quantity: 40,
  },
  {
    id: "20",
    image: "/laptop-backpack-tech.jpg",
    name: "Tech Travel Backpack",
    category: "Electronics",
    description: "Professional laptop backpack with smart organization",
    specification: "15.6 inch laptop compartment, USB port, Waterproof",
    rating: 4.6,
    price: 89.99,
    quantity: 21,
  },
]

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(defaultProducts)
  const [cart, setCart] = useState<CartItem[]>([])
  const [user, setUser] = useState<User | null>(null)

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
      value={{
        products,
        cart,
        user,
        addProduct,
        updateProductQuantity,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        setUser,
      }}
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
