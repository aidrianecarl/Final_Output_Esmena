"use client"

import type React from "react"

import { useState } from "react"
import { useProducts } from "@/context/product-context"

interface AddProductFormProps {
  onSuccess: () => void
}

export default function AddProductForm({ onSuccess }: AddProductFormProps) {
  const { addProduct } = useProducts()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: 5,
    price: "",
    quantity: "",
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.image.trim()) newErrors.image = "Image URL is required"
    if (!formData.name.trim()) newErrors.name = "Product name is required"
    if (!formData.category.trim()) newErrors.category = "Category is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.specification.trim()) newErrors.specification = "Specification is required"
    if (!formData.price || Number.parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required"
    if (!formData.quantity || Number.parseInt(formData.quantity) <= 0) newErrors.quantity = "Valid quantity is required"
    if (formData.rating < 0 || formData.rating > 5) newErrors.rating = "Rating must be between 0 and 5"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    addProduct({
      id: Date.now().toString(),
      image: formData.image,
      name: formData.name,
      category: formData.category,
      description: formData.description,
      specification: formData.specification,
      rating: Number.parseFloat(formData.rating.toString()),
      price: Number.parseFloat(formData.price),
      quantity: Number.parseInt(formData.quantity),
    })

    setIsSubmitting(false)
    setFormData({
      image: "",
      name: "",
      category: "",
      description: "",
      specification: "",
      rating: 5,
      price: "",
      quantity: "",
    })

    onSuccess()
  }

  const inputClass =
    "w-full px-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-300 disabled:opacity-50"

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-border space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Add New Product</h2>

        {/* Image URL */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Product Image URL <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
        </div>

        {/* Product Name */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Product Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter product name"
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            disabled={isSubmitting}
          >
            <option value="">Select a category</option>
            <option value="Electronics">Electronics</option>
            <option value="Audio">Audio</option>
            <option value="Wearables">Wearables</option>
            <option value="Accessories">Accessories</option>
            <option value="Other">Other</option>
          </select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={3}
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        {/* Specification */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Specification <span className="text-red-500">*</span>
          </label>
          <textarea
            name="specification"
            value={formData.specification}
            onChange={handleChange}
            placeholder="Enter product specifications"
            rows={3}
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.specification && <p className="text-sm text-red-500">{errors.specification}</p>}
        </div>

        {/* Rating */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">Rating (0-5)</label>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            step="0.1"
            className={inputClass}
            disabled={isSubmitting}
          />
          {errors.rating && <p className="text-sm text-red-500">{errors.rating}</p>}
        </div>

        {/* Price and Quantity Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Price <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              min="0"
              step="0.01"
              className={inputClass}
              disabled={isSubmitting}
            />
            {errors.price && <p className="text-sm text-red-500">{errors.price}</p>}
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">
              Quantity <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={inputClass}
              disabled={isSubmitting}
            />
            {errors.quantity && <p className="text-sm text-red-500">{errors.quantity}</p>}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-lg font-bold text-white text-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-xl hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Adding Product..." : "Add Product"}
        </button>
      </div>
    </form>
  )
}
