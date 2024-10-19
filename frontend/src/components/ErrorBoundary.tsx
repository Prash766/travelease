import { Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function ErrorBoundary() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4">500</h1>
      <h2 className="text-xl sm:text-2xl mb-4 sm:mb-8">Server Error</h2>
      <p className="text-base sm:text-lg mb-6 sm:mb-8 text-center max-w-xs sm:max-w-sm md:max-w-md">
        Oops! We encountered an issue. Please refresh the page
      </p>
      <Link to="/">
        <button className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-black text-white p-4">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </button>
      </Link>
    </div>
  )
}