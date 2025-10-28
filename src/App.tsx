import { BookmarkProvider } from './context/BookmarkContext'
import SearchPage from './pages/SearchPage'
import './App.css'

function App() {
  return (
    <BookmarkProvider>
      <div className="app">
        <header className="app-header">
          <div className="header-content">
            <div className="header-left">
              <div className="brand-logo">GRS</div>
              <div className="brand-text">
                <h1>🔍 GitHub Repository Search</h1>
                <p>Search and bookmark your favorite repositories</p>
              </div>
            </div>
            <div className="header-right">
              <button
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  const input = document.getElementById('search-input') as HTMLInputElement | null
                  if (input) input.focus()
                }}
              >
                Start searching
              </button>
            </div>
          </div>
        </header>
        <SearchPage />
        <footer className="app-footer">
          <div className="footer-content">
            <p>
              Powered by{' '}
              <a
                href="https://docs.github.com/en/rest"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub API
              </a>
            </p>
            <p className="footer-note">
              Built with React & TypeScript • Data updates in real-time
            </p>
          </div>
        </footer>
      </div>
    </BookmarkProvider>
  )
}

export default App
