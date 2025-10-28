import React, { useState, useMemo, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import FilterToggle from '../components/FilterToggle'
import RepositoryList from '../components/RepositoryList'
import { useDebounce } from '../hooks/useDebounce'
import { useGitHubSearch } from '../hooks/useGitHubSearch'
import { useBookmarks } from '../context/BookmarkContext'
import './SearchPage.css'

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false)
  const debouncedSearchTerm = useDebounce(searchTerm, 300)

  const { repositories, loading, error } = useGitHubSearch(debouncedSearchTerm)
  const { isBookmarked, bookmarksArray } = useBookmarks()

  // Calculate bookmarked count from current search results only
  const bookmarkedInCurrentResults = useMemo(() => {
    return repositories.filter((repo) => isBookmarked(repo.id)).length
  }, [repositories, isBookmarked])

  const [showAllBookmarked, setShowAllBookmarked] = useState(false)

  const filteredRepositories = useMemo(() => {
    if (showAllBookmarked) {
      // show all saved bookmarks across searches
      return bookmarksArray
    }
    if (!showBookmarkedOnly) {
      return repositories
    }
    return repositories.filter((repo) => isBookmarked(repo.id))
  }, [repositories, showBookmarkedOnly, isBookmarked, showAllBookmarked, bookmarksArray])

  const handleToggleFilter = useCallback(() => {
    setShowBookmarkedOnly((prev) => !prev)
  }, [])

  const handleSuggestionClick = useCallback((query: string) => {
    setSearchTerm(query)
  }, [])

  const hasSearched = debouncedSearchTerm.trim().length > 0

  return (
    <div className="search-page">
      <div className="search-controls">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
        <div className="filter-controls">
          {hasSearched && repositories.length > 0 && (
          <FilterToggle
            showBookmarkedOnly={showBookmarkedOnly}
            onToggle={handleToggleFilter}
            bookmarkCount={bookmarkedInCurrentResults}
          />
          )}

          <button
            className={`btn btn-ghost ${showAllBookmarked ? 'active' : ''}`}
            onClick={() => setShowAllBookmarked((v) => !v)}
            title={showAllBookmarked ? 'Show search results' : 'Show all bookmarked repositories'}
          >
            {showAllBookmarked ? 'Showing: All Bookmarks' : 'All Bookmarks'}
          </button>
        </div>
      </div>

      <RepositoryList
        repositories={filteredRepositories}
        loading={loading}
        error={error}
        hasSearched={hasSearched || showAllBookmarked}
        onSuggestionClick={handleSuggestionClick}
      />
    </div>
  )
}

export default SearchPage
