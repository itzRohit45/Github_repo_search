/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useReducer, useEffect } from 'react'
import type { Repository } from '../types/repository'

const STORAGE_KEY = 'github-bookmarks'

interface BookmarkState {
  // store a map of id -> Repository so we can render bookmarked items even
  // when they're not currently in the search results
  bookmarks: Record<number, Repository>
}

type BookmarkAction =
  | { type: 'TOGGLE_BOOKMARK'; payload: Repository }
  | { type: 'LOAD_BOOKMARKS'; payload: Repository[] }

const BookmarkContext = createContext<{
  // array form is convenient for listing; map form for fast lookup
  bookmarksMap: Record<number, Repository>
  bookmarksArray: Repository[]
  toggleBookmark: (repo: Repository) => void
  isBookmarked: (id: number) => boolean
} | null>(null)

const bookmarkReducer = (
  state: BookmarkState,
  action: BookmarkAction
): BookmarkState => {
  switch (action.type) {
    case 'TOGGLE_BOOKMARK': {
      const { payload } = action
      const newBookmarks = { ...state.bookmarks }
      if (newBookmarks[payload.id]) {
        delete newBookmarks[payload.id]
      } else {
        newBookmarks[payload.id] = payload
      }
      return { bookmarks: newBookmarks }
    }
    case 'LOAD_BOOKMARKS': {
      const map: Record<number, Repository> = {}
      action.payload.forEach((r) => {
        map[r.id] = r
      })
      return { bookmarks: map }
    }
    default:
      return state
  }
}

export const BookmarkProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Use a lazy initializer so we synchronously read from localStorage during
  // the initial render. This avoids an issue where an effect writes an empty
  // value before the load effect runs (which can happen in React StrictMode
  // during development), causing stored bookmarks to be erased on reload.
  const typedReducer = bookmarkReducer as React.Reducer<BookmarkState, BookmarkAction>

  const [state, dispatch] = useReducer(
    typedReducer,
    { bookmarks: {} },
    () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (stored) {
          const parsedAny = JSON.parse(stored)
          if (Array.isArray(parsedAny)) {
            const parsed = parsedAny as Repository[]
            const map: Record<number, Repository> = {}
            parsed.forEach((r) => {
              map[r.id] = r
            })
            return { bookmarks: map }
          }
        }
      } catch (error) {
        console.error('Failed to read bookmarks from localStorage during init:', error)
      }
      return { bookmarks: {} }
    }
  )

  // Save bookmarks whenever the in-memory map changes.
  useEffect(() => {
    try {
      const arr = Object.values(state.bookmarks)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
    } catch (err) {
      console.error('Failed to save bookmarks to localStorage', err)
    }
  }, [state.bookmarks])

  const toggleBookmark = (repo: Repository) => {
    dispatch({ type: 'TOGGLE_BOOKMARK', payload: repo })
  }

  const isBookmarked = (id: number) => !!state.bookmarks[id]

  const bookmarksArray = Object.values(state.bookmarks)

  return (
    <BookmarkContext.Provider value={{ bookmarksMap: state.bookmarks, bookmarksArray, toggleBookmark, isBookmarked }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export const useBookmarks = () => {
  const context = useContext(BookmarkContext)
  if (!context) {
    throw new Error('useBookmarks must be used within BookmarkProvider')
  }
  return context
}
