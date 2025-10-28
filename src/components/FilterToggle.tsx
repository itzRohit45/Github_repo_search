import React, { memo } from 'react'
import './FilterToggle.css'

interface FilterToggleProps {
  showBookmarkedOnly: boolean
  onToggle: () => void
  bookmarkCount: number
}

const FilterToggle: React.FC<FilterToggleProps> = memo(
  ({ showBookmarkedOnly, onToggle, bookmarkCount }) => {
    return (
      <div className="filter-toggle">
        <button
          onClick={onToggle}
          className={`filter-button ${showBookmarkedOnly ? 'active' : ''}`}
          aria-pressed={showBookmarkedOnly}
          title={showBookmarkedOnly ? 'Show all results' : 'Show only bookmarked repositories'}
        >
          {showBookmarkedOnly ? '📚 Show All' : '⭐ Bookmarks'}
          {bookmarkCount > 0 && (
            <span className="bookmark-count">({bookmarkCount})</span>
          )}
        </button>
      </div>
    )
  }
)

FilterToggle.displayName = 'FilterToggle'

export default FilterToggle
