# 🔍 GitHub Repository Search

A modern, performant React micro-app for searching and bookmarking GitHub repositories.

## 🚀 Live Demo

[Deploy to Vercel/Netlify and add link here]

## ✨ Features

- **Real-time Search**: Debounced search (300ms) with GitHub's public API
- **Smart Bookmarking**: Persist bookmarks to localStorage across sessions
- **Filtered Views**: Toggle between all results and bookmarked repositories
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Performance Optimized**: React.memo, useCallback, and proper state management
- **Error Handling**: Graceful handling of loading, empty, and error states
- **Quick Start Suggestions**: Popular search examples to get started immediately

## 🎯 Quick Start for Demo

When you first open the app, you'll see a welcome screen with **popular search suggestions**:
- ⚛️ React
- 📘 TypeScript
- ▲ Next.js
- 💚 Vue
- 🐍 Python
- 🟢 Node.js

**Click any suggestion** to instantly see results and test the features!

## 🛠️ Tech Stack

- **React 18** with TypeScript
- **Vite** for blazing-fast development
- **Context API + useReducer** for state management
- **Custom hooks** for reusable logic
- **CSS3** with CSS variables for theming
- **ESLint + Prettier** for code quality

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd Rohit

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at http://localhost:5173 with an **interactive welcome screen** that guides you through testing all features.

## 🎯 Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
npm run format   # Format code with Prettier
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.tsx
│   ├── FilterToggle.tsx
│   ├── RepositoryCard.tsx
│   └── RepositoryList.tsx
├── context/            # React Context providers
│   └── BookmarkContext.tsx
├── hooks/              # Custom React hooks
│   ├── useDebounce.ts
│   └── useGitHubSearch.ts
├── pages/              # Page components
│   └── SearchPage.tsx
├── types/              # TypeScript type definitions
│   └── repository.ts
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## 🎨 Design Decisions

### Architecture
- **Component-based**: Small, focused components for better reusability and testing
- **Custom hooks**: Extracted logic into `useDebounce` and `useGitHubSearch` for separation of concerns
- **Context API**: Lightweight state management for bookmarks without external dependencies

### UX Enhancements
- **Welcome Screen**: Provides popular search suggestions for immediate testing
- **Empty States**: Helpful suggestions when no results are found
- **Feature Preview**: Shows key features on the landing page
- **One-Click Testing**: Users can test the app without typing

### Performance Optimizations
1. **React.memo**: All components are memoized to prevent unnecessary re-renders
2. **useCallback**: Event handlers are memoized to maintain referential equality
3. **useMemo**: Filtered repository list is memoized for expensive computations
4. **Debouncing**: 300ms debounce on search input to reduce API calls
5. **Lazy Loading**: Could add pagination for large result sets (future enhancement)

### State Management
- **Context + Reducer**: Bookmark state uses reducer pattern for predictable updates
- **localStorage**: Bookmarks persist across sessions with error handling
- **Set data structure**: O(1) lookup for bookmark checks

### Error Handling
- Try-catch blocks for API calls and localStorage operations
- User-friendly error messages
- Loading states with visual feedback
- Empty state guidance

## 🔄 Trade-offs

### What I Prioritized
✅ Clean, maintainable code structure  
✅ Performance optimizations (memo, callback, debounce)  
✅ Type safety with TypeScript  
✅ Accessibility (ARIA labels, semantic HTML)  
✅ Responsive design  

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - feel free to use this project for learning or production.

---

**Built with ❤️ using React + TypeScript**
