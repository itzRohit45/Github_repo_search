# 🔍 GitHub Repository Search

A focused React + TypeScript micro-app to search GitHub repositories and save bookmarks locally.

This README is intended to be a single-source reference for installing, running, and understanding the app. It also includes a short design notes section explaining architecture choices and future work.

---

## 🚀 Live Demo

If deployed, add the public URL here. Example providers: Vercel, Netlify, GitHub Pages.

---

# 🔍 GitHub Repository Search

A focused React + TypeScript micro-app to search GitHub repositories and save bookmarks locally.

This README is the single-source reference for installing, running, and understanding the app. It also includes a short design notes section that explains architecture choices and outlines potential future work.

---

## 🚀 Live Demo

If deployed, add the public URL here. Example providers: Vercel, Netlify, GitHub Pages.

---

## Quick overview (1‑minute)

- A single text input (debounced at 300 ms) queries GitHub's Search Repositories endpoint.
- The app displays the top 30 results as cards showing title, description, stars, language, and owner avatar.
- Each card has a star toggle to bookmark repositories. Bookmarks persist to localStorage and survive page reloads.
- You can either (1) filter the current search results to show only bookmarked items, or (2) switch to a view that shows all saved bookmarks.

---

## Table of contents

1. Quick start

# 🔍 GitHub Repository Search

A focused React + TypeScript micro-app to search GitHub repositories and save bookmarks locally.

This README is the single-source reference for installing, running, and understanding the app. It also includes a short design notes section that explains architecture choices and outlines potential future work.

---

## 🚀 Live Demo

If deployed, add the public URL here. Example providers: Vercel, Netlify, GitHub Pages.

---

## Quick overview (1‑minute)

- A single text input (debounced at 300 ms) queries GitHub's Search Repositories endpoint.
- The app displays the top 30 results as cards showing title, description, stars, language, and owner avatar.
- Each card has a star toggle to bookmark repositories. Bookmarks persist to localStorage and survive page reloads.
- You can either (1) filter the current search results to show only bookmarked items, or (2) switch to a view that shows all saved bookmarks.

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
- The search input has id `search-input` (the header "Start searching" button focuses this input).
- Bookmarks are stored under the localStorage key `github-bookmarks` as a JSON array of repository objects.

---

## 2) Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (tsc) and build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint (configured to fail on warnings)
- `npm run format` — run Prettier across the codebase

---

## 3) How it works (implementation details)

Search
- `src/hooks/useGitHubSearch.ts` performs the GitHub API call to `GET https://api.github.com/search/repositories` and returns the first 30 results (`per_page=30`). The hook exposes `{ repositories, loading, error }`.
- Debouncing is handled in `src/pages/SearchPage.tsx` via `useDebounce` (300 ms) to reduce API calls.

Bookmarks
- Bookmarks are managed by `src/context/BookmarkContext.tsx` using `useReducer`.
- Bookmarks are stored as a map (id → Repository) for O(1) lookups and are also exposed as an array for listing.
- Persistence: bookmarks are loaded synchronously during reducer initialization from localStorage (key `github-bookmarks`) to avoid a race condition where an early save could overwrite stored data. Any changes are saved back to localStorage.
- UI: `RepositoryCard.tsx` shows a star button that calls `toggleBookmark(repository)`.
- Filter behavior (two modes):
  - "Bookmarked only" (FilterToggle) limits the current search results to those that are bookmarked.
  - "All Bookmarks" shows the entire set of saved bookmarks across searches.

Performance
- Components use `React.memo` and event handlers are memoized with `useCallback`.
- Expensive derived values (filtered lists) use `useMemo`.

Error / empty states
- `RepositoryList.tsx` contains dedicated UI for loading, empty, and error states, along with helpful suggestions.

Types
- Repository shape is defined in `src/types/repository.ts`. Bookmarks store full repository objects so the bookmarked list can be rendered even when those repositories aren’t present in the current search results.

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
- Simplicity: no external state libraries — Context + reducer covers the bookmarking use case well.
- Performance: avoid unnecessary re-renders using memoization.
- UX: clear empty / loading / error states and a friendly welcome screen to exercise features quickly.

Trade-offs / future work

### What Could Be Enhanced (Given More Time)
# 🔍 GitHub Repository Search

A focused React + TypeScript micro-app to search GitHub repositories and save bookmarks locally.

This README is the single-source reference for installing, running, and understanding the app. It also includes a short design notes section that explains architecture choices and outlines potential future work.

---

## 🚀 Live Demo

If deployed, add the public URL here. Example providers: Vercel, Netlify, GitHub Pages.

---

## Quick overview (1‑minute)

- A single text input (debounced at 300 ms) queries GitHub's Search Repositories endpoint.
- The app displays the top 30 results as cards showing title, description, stars, language, and owner avatar.
- Each card has a star toggle to bookmark repositories. Bookmarks persist to localStorage and survive page reloads.
- You can either (1) filter the current search results to show only bookmarked items, or (2) switch to a view that shows all saved bookmarks.

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
- The search input has id `search-input` (the header "Start searching" button focuses this input).
- Bookmarks are stored under the localStorage key `github-bookmarks` as a JSON array of repository objects.

---

## 2) Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — typecheck (tsc) and build production bundle
- `npm run preview` — preview production build
- `npm run lint` — run ESLint (configured to fail on warnings)
- `npm run format` — run Prettier across the codebase

---

## 3) How it works (implementation details)

Search
- `src/hooks/useGitHubSearch.ts` performs the GitHub API call to `GET https://api.github.com/search/repositories` and returns the first 30 results (`per_page=30`). The hook exposes `{ repositories, loading, error }`.
- Debouncing is handled in `src/pages/SearchPage.tsx` via `useDebounce` (300 ms) to reduce API calls.

Bookmarks
- Bookmarks are managed by `src/context/BookmarkContext.tsx` using `useReducer`.
- Bookmarks are stored as a map (id → Repository) for O(1) lookups and are also exposed as an array for listing.
- Persistence: bookmarks are loaded synchronously during reducer initialization from localStorage (key `github-bookmarks`) to avoid a race condition where an early save could overwrite stored data. Any changes are saved back to localStorage.
- UI: `RepositoryCard.tsx` shows a star button that calls `toggleBookmark(repository)`.
- Filter behavior (two modes):
  - "Bookmarked only" (FilterToggle) limits the current search results to those that are bookmarked.
  - "All Bookmarks" shows the entire set of saved bookmarks across searches.

Performance
- Components use `React.memo` and event handlers are memoized with `useCallback`.
- Expensive derived values (filtered lists) use `useMemo`.

Error / empty states
- `RepositoryList.tsx` contains dedicated UI for loading, empty, and error states, along with helpful suggestions.

Types
- Repository shape is defined in `src/types/repository.ts`. Bookmarks store full repository objects so the bookmarked list can be rendered even when those repositories aren’t present in the current search results.

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
- Simplicity: no external state libraries — Context + reducer covers the bookmarking use case well.
- Performance: avoid unnecessary re-renders using memoization.
- UX: clear empty / loading / error states and a friendly welcome screen to exercise features quickly.

Trade-offs / future work

### What Could Be Enhanced (Given More Time)
- **Testing**: Unit tests (Jest), integration tests (React Testing Library)
- **Pagination**: Load more results beyond the first 30
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
   - Add a service worker for offline support
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

1. **Open the app** — you'll see a welcome screen
2. **Click a suggestion** — try "React" or "TypeScript"
3. **Bookmark repositories** — click the ☆ button on any card
4. **Filter bookmarks** — use the "⭐ Bookmarked Only" toggle
5. **Search custom terms** — type anything in the search bar
6. **Check persistence** — refresh the page; bookmarks remain!
---




