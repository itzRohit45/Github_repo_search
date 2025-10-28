import { useState, useEffect, useCallback } from 'react'
import type { Repository } from '../types/repository'

interface SearchState {
  repositories: Repository[]
  loading: boolean
  error: string | null
}

const GITHUB_API = 'https://api.github.com/search/repositories'
const RESULTS_PER_PAGE = 30

export function useGitHubSearch(query: string) {
  const [state, setState] = useState<SearchState>({
    repositories: [],
    loading: false,
    error: null,
  })

  const searchRepositories = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setState({ repositories: [], loading: false, error: null })
      return
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const url = `${GITHUB_API}?q=${encodeURIComponent(searchQuery)}&per_page=${RESULTS_PER_PAGE}&sort=stars&order=desc`
      const response = await fetch(url)

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const data = await response.json()
      setState({
        repositories: data.items || [],
        loading: false,
        error: null,
      })
    } catch (err) {
      setState({
        repositories: [],
        loading: false,
        error: err instanceof Error ? err.message : 'An error occurred',
      })
    }
  }, [])

  useEffect(() => {
    searchRepositories(query)
  }, [query, searchRepositories])

  return state
}
