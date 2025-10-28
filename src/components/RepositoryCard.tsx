import React, { memo, useCallback } from 'react'
import type { Repository } from '../types/repository'
import { useBookmarks } from '../context/BookmarkContext'
import './RepositoryCard.css'

interface RepositoryCardProps {
  repository: Repository
}

const RepositoryCard: React.FC<RepositoryCardProps> = memo(({ repository }) => {
  const { toggleBookmark, isBookmarked } = useBookmarks()
  const bookmarked = isBookmarked(repository.id)

  const handleBookmarkClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault()
      toggleBookmark(repository)
    },
    [repository, toggleBookmark]
  )

  const formatStars = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toLocaleString()
  }

  return (
    <div className="repository-card">
      <div className="card-header">
        <img
          src={repository.owner.avatar_url}
          alt={`${repository.owner.login} avatar`}
          className="avatar"
          loading="lazy"
        />
        <div className="card-title-section">
          <a
            href={repository.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="card-title"
          >
            {repository.full_name}
          </a>
          <p className="card-owner">by {repository.owner.login}</p>
        </div>
        <button
          onClick={handleBookmarkClick}
          className={`bookmark-button ${bookmarked ? 'bookmarked' : ''}`}
          aria-label={bookmarked ? 'Remove bookmark' : 'Add bookmark'}
          title={bookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}
        >
          {bookmarked ? '⭐' : '☆'}
        </button>
      </div>

      <p className="card-description">
        {repository.description || 'No description available'}
      </p>

      <div className="card-footer">
        <span className="card-stat" title={`${repository.stargazers_count.toLocaleString()} stars`}>
          ⭐ {formatStars(repository.stargazers_count)}
        </span>
        {repository.language && (
          <span className="card-language">{repository.language}</span>
        )}
      </div>
    </div>
  )
})

RepositoryCard.displayName = 'RepositoryCard'

export default RepositoryCard
