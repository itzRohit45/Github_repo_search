import React, { memo } from 'react'
import './SearchBar.css'

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

const SearchBar: React.FC<SearchBarProps> = memo(
  ({ value, onChange, placeholder = 'Search repositories...' }) => {
    return (
      <div className="search-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            id="search-input"
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="search-input"
            aria-label="Search repositories"
            autoComplete="off"
          />
          {value && (
            <button
              className="clear-button"
              onClick={() => onChange('')}
              aria-label="Clear search"
              title="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>
    )
  }
)

SearchBar.displayName = 'SearchBar'

export default SearchBar
