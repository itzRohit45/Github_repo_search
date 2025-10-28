# 🔍 GitHub Repository Search

A focused React + TypeScript micro-app to search GitHub repositories and save bookmarks locally.

This README is intended to be a single-source reference for installing, running, and understanding the app. It also includes a short design notes section explaining architecture choices and future work.

---

## 🚀 Live Demo

If deployed, add the public URL here. Example providers: Vercel, Netlify, GitHub Pages.

---

## Quick overview (1‑minute)

- One text input (debounced at 300ms) queries GitHub's public Search Repositories endpoint.
- The app shows the top 30 results as cards (title, description, stars, language, owner avatar).
- Cards have a star toggle to bookmark repositories. Bookmarks persist to localStorage and survive reloads.
- You can (1) filter the current search results to show only bookmarked items, or (2) toggle a view to show all saved bookmarks.

---

## Table of contents

1. Quick start
2. Scripts
3. How it works (implementation details)
4. Project structure
5. Decisions, trade-offs and future work
---

## 1) Quick start

Clone and run locally:

```bash
git clone <your-repo-url>
cd Rohit
npm install
npm run dev

# Open http://localhost:5173
```

Notes:
- The search input has id `search-input` (used by the header "Start searching" button to focus the input).
- Bookmarks are stored under localStorage key `github-bookmarks` as a JSON array of repository objects.

---

## 2) Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (tsc) and build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint (configured to fail on warnings)
- `npm run format` — run Prettier over the codebase

---

## 3) How it works (implementation details)

Search
- `src/hooks/useGitHubSearch.ts` performs the GitHub API call to `GET https://api.github.com/search/repositories` and returns the first 30 results (per_page=30). The hook exposes `{ repositories, loading, error }`.
- Debouncing is handled in `src/pages/SearchPage.tsx` via `useDebounce` (300ms). This reduces API calls.

Bookmarks
- Bookmarks are managed by `src/context/BookmarkContext.tsx` using `useReducer`.
- Bookmarks are kept as a map (id -> Repository) for O(1) lookups and also exposed as an array for listing.
- Persistence: bookmarks are read synchronously during reducer initialization from localStorage (key `github-bookmarks`) to avoid a race where an early save overwrites stored data (this was an important bugfix). Any changes to bookmarks are saved back to localStorage.
- UI: `RepositoryCard.tsx` shows a star button that calls `toggleBookmark(repository)`.
- Filter behavior (two modes):
  - "Bookmarked only" (FilterToggle) limits the current search results to only those bookmarked.
  - "All Bookmarks" button shows the entire set of saved bookmarks (across searches).

Performance
- Components use `React.memo` and event handlers are memoized with `useCallback`.
- Expensive derived values (filtered lists) use `useMemo`.

Error / empty states
- `RepositoryList.tsx` contains dedicated UI for loading, empty and error states and helpful suggestions.

Types
- Repository shape is defined in `src/types/repository.ts`. Bookmarks store full repository objects so the bookmarked list can be rendered even if those repos aren’t present in current search results.

---

## 4) Project structure

```
src/
├─ components/        # UI components (SearchBar, RepositoryCard, RepositoryList, FilterToggle)
├─ context/           # BookmarkProvider and hook (useBookmarks)
├─ hooks/             # useDebounce, useGitHubSearch
├─ pages/             # SearchPage (app page wiring)
├─ types/             # Repository type
├─ App.tsx            # Root component (header + page)
└─ main.tsx           # App entry (mounts BookmarkProvider)
```

---

## 5) Decisions, trade-offs and future work

What I prioritized
- Simplicity: no external state libraries. Context + reducer covers the bookmarking use-case well.
- Performance: avoid unnecessary re-renders with memoization.
- UX: clear empty / loading / error states and a friendly welcome screen to exercise features quickly.

Trade-offs / future work

### What Could Be Enhanced (Given More Time)
- **Testing**: Unit tests (Jest), integration tests (React Testing Library)
- **Pagination**: Load more results beyond first 30
- **Advanced Filters**: Filter by language, stars, date
- **Sorting**: Custom sort options (stars, forks, updated)
- **Search History**: Track recent searches
- **Keyboard Navigation**: Full keyboard accessibility
- **Animation**: Smooth transitions for state changes
- **PWA**: Offline support with service workers
- **Dark Mode**: Theme toggle
- **Export/Import**: Bookmarks backup functionality

## 🚧 Possible Next Steps

1. **Add Testing Suite**
   - Jest + React Testing Library
   - E2E tests with Playwright/Cypress
   - Minimum 80% code coverage

2. **Enhance Features**
   - Infinite scroll or pagination
   - Search history with local storage
   - Share bookmark collections

3. **Performance**
   - Implement React.lazy for code splitting
   - Add service worker for offline support
   - Optimize bundle size

4. **UX Improvements**
   - Add keyboard shortcuts
   - Implement drag-and-drop for bookmarks
   - Add animations with Framer Motion

5. **Deploy & Monitor**
   - Set up CI/CD pipeline
   - Add error tracking (Sentry)
   - Performance monitoring (Web Vitals)

## 📝 API Rate Limiting

GitHub API allows 60 requests/hour for unauthenticated requests. For production:
- Implement GitHub OAuth for higher limits (5000 requests/hour)
- Add rate limit indicators to UI
- Cache results for common searches

## 🎬 How to Test the Demo

1. **Open the app** - You'll see a welcome screen
2. **Click a suggestion** - Try "React" or "TypeScript"
3. **Bookmark repositories** - Click the ☆ button on any card
4. **Filter bookmarks** - Use the "⭐ Bookmarked Only" toggle
5. **Search custom terms** - Type anything in the search bar
6. **Check persistence** - Refresh the page, bookmarks remain!
---




