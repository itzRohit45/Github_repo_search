import React, { memo } from 'react'
import type { Repository } from '../types/repository'
import RepositoryCard from './RepositoryCard'
import './RepositoryList.css'

interface RepositoryListProps {
  repositories: Repository[]
  loading: boolean
  error: string | null
  hasSearched: boolean
  onSuggestionClick?: (query: string) => void
}

const POPULAR_SEARCHES = [
  { query: 'react', label: 'React' },
  { query: 'typescript', label: 'TypeScript' },
  { query: 'nextjs', label: 'Next.js' },
  { query: 'vue', label: 'Vue' },
  { query: 'python', label: ' Python' },
  { query: 'nodejs', label: 'Node.js' },
]

const RepositoryList: React.FC<RepositoryListProps> = memo(
  ({ repositories, loading, error, hasSearched, onSuggestionClick }) => {
    if (loading) {
      return (
        <div className="status-message">
          <div className="loader"></div>
          <p>Searching repositories...</p>
          <p className="loading-hint">Fetching data from GitHub API</p>
        </div>
      )
    }

    if (error) {
      return (
        <div className="status-message error">
          <p>❌ {error}</p>
          <p className="error-hint">
            {error.includes('rate limit')
              ? 'GitHub API rate limit reached. Please try again later.'
              : 'Please check your connection and try again'}
          </p>
        </div>
      )
    }

    if (!hasSearched) {
      return (
        <div className="status-message welcome">
          <div className="welcome-content">
            <h2> Welcome to GitHub Repository Search!</h2>
            <p className="welcome-description">
              Discover and bookmark amazing open-source projects from GitHub's vast collection.
              Search by name, topic, or technology to find repositories that interest you.
            </p>
            
            <div className="getting-started">
              <h3>Popular Searches to Get Started:</h3>
              <div className="suggestion-grid">
                {POPULAR_SEARCHES.map((search) => (
                  <button
                    key={search.query}
                    className="suggestion-button"
                    onClick={() => onSuggestionClick?.(search.query)}
                  >
                    {search.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="features-preview">
              <div className="feature-item">
                <span className="feature-icon">🔍</span>
                <p>Real-time search with 300ms debouncing</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">⭐</span>
                <p>Bookmark your favorite repositories</p>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💾</span>
                <p>Bookmarks saved in browser storage</p>
              </div>
            </div>
          </div>
        </div>
      )
    }

    if (repositories.length === 0) {
      return (
        <div className="status-message">
          <p>📭 No repositories found</p>
          <p className="error-hint">
            {hasSearched 
              ? 'Try searching for something else or browse these popular topics:'
              : 'Browse these popular topics to get started:'}
          </p>
          <div className="suggestion-chips">
            {POPULAR_SEARCHES.slice(0, 3).map((search) => (
              <button
                key={search.query}
                className="suggestion-chip"
                onClick={() => onSuggestionClick?.(search.query)}
              >
                {search.label}
              </button>
            ))}
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="results-header">
          <p className="results-count">
            Found <strong>{repositories.length}</strong> {repositories.length === 1 ? 'repository' : 'repositories'}
          </p>
        </div>
        <div className="repository-list">
          {repositories.map((repo) => (
            <RepositoryCard key={repo.id} repository={repo} />
          ))}
        </div>
      </>
    )
  }
)

RepositoryList.displayName = 'RepositoryList'

export default RepositoryList
