'use client'

import { useState, useEffect, useRef } from 'react'
import { Input } from '@/components/ui/input'

interface Suggestion {
  formatted: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  postcode?: string
  country: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect: (suggestion: Suggestion) => void
  placeholder?: string
  required?: boolean
}

const GEOAPIFY_API_KEY = 'ec0a6a4ec8b94ca9bdbafc9b62e5d618'

export default function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  required
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Fetch suggestions from Geoapify
  useEffect(() => {
    if (!value || value.length < 3) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }

    const fetchSuggestions = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(
          `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(value)}&apiKey=${GEOAPIFY_API_KEY}&limit=5&filter=countrycode:us`
        )
        const data = await response.json()
        
        if (data.features && data.features.length > 0) {
          const formattedSuggestions: Suggestion[] = data.features.map((feature: {
            properties: {
              formatted?: string
              housenumber?: string
              street?: string
              name?: string
              result_type?: string
              address_line1?: string
              state_code?: string
              state?: string
              city?: string
              postcode?: string
              country?: string
            }
          }) => {
            const props = feature.properties
            // For street addresses, use housenumber+street, or just street, or name
            let streetAddress = ''
            if (props.housenumber && props.street) {
              streetAddress = `${props.housenumber} ${props.street}`
            } else if (props.street) {
              streetAddress = props.street
            } else if (props.name && (props.result_type === 'building' || props.result_type === 'amenity')) {
              streetAddress = props.name
            } else if (props.address_line1) {
              // Only use address_line1 if it's not the full formatted address
              streetAddress = props.address_line1
            } else {
              streetAddress = props.name || ''
            }

            // Address Line 2 should be empty or only contain apartment/unit info
            // Geoapify's address_line2 is not the apartment field - it's the city/state/zip string
            const addressLine2 = ''

            // Prefer state_code (e.g., "NC") over full state name (e.g., "North Carolina")
            const stateValue = props.state_code || props.state || ''

            return {
              formatted: props.formatted || '',
              address_line1: streetAddress,
              address_line2: addressLine2, // Keep empty - user can fill apartment/unit manually
              city: props.city || '',
              state: stateValue,
              postcode: props.postcode || '',
              country: props.country || 'United States'
            }
          })
          setSuggestions(formattedSuggestions)
          setShowSuggestions(true)
        }
      } catch (error) {
        console.error('Error fetching suggestions:', error)
        setSuggestions([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchSuggestions, 300)
    return () => clearTimeout(debounceTimer)
  }, [value])

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelect = (suggestion: Suggestion) => {
    onChange(suggestion.address_line1)
    onSelect(suggestion)
    setShowSuggestions(false)
  }

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
          setShowSuggestions(true)
        }}
        onFocus={() => {
          if (suggestions.length > 0) {
            setShowSuggestions(true)
          }
        }}
        placeholder={placeholder}
        required={required}
      />
      
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className="w-full text-left px-4 py-2 hover:bg-secondary transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium">{suggestion.formatted}</div>
            </button>
          ))}
        </div>
      )}
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-xs">
          Searching...
        </div>
      )}
    </div>
  )
}
