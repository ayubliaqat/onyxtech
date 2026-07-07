'use client'

import { useState, useEffect, useRef } from 'react'
import './ProductCategorySearch.scss'

interface SearchResult {
  id: string
  name: string
  type: 'product' | 'category'
}

export const ProductCategorySearch = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [open, setOpen] = useState(false)
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)

    if (!query.trim()) {
      setResults([])
      setOpen(false)
      return
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          fetch(`/api/products?where[name][contains]=${encodeURIComponent(query)}&limit=5`),
          fetch(`/api/categories?where[name][contains]=${encodeURIComponent(query)}&limit=5`),
        ])

        const products = await productsRes.json()
        const categories = await categoriesRes.json()

        const combined: SearchResult[] = [
          ...(products.docs || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            type: 'product' as const,
          })),
          ...(categories.docs || []).map((c: any) => ({
            id: c.id,
            name: c.name,
            type: 'category' as const,
          })),
        ]

        setResults(combined)
        setOpen(combined.length > 0)
      } catch {
        setResults([])
        setOpen(false)
      }
    }, 300)

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current)
    }
  }, [query])

  const goToResult = (result: SearchResult) => {
    const collection = result.type === 'product' ? 'products' : 'categories'
    window.location.href = `/admin/collections/${collection}/${result.id}`
  }

  return (
    <div className="onyx-search">
      <input
        type="text"
        className="onyx-search__input"
        placeholder="Search products or categories..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => results.length > 0 && setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
      />

      {open && (
        <div className="onyx-search__results">
          {results.map((r) => (
            <button
              key={`${r.type}-${r.id}`}
              type="button"
              className="onyx-search__result"
              onClick={() => goToResult(r)}
            >
              <span className="onyx-search__result-name">{r.name}</span>
              <span className="onyx-search__result-type">{r.type}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
