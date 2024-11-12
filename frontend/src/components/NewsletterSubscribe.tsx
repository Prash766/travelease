
const NewsletterSubscribe = () => {
  return (
    <section className="py-16 bg-indigo-600">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-white mb-4">Subscribe to Our Newsletter</h2>
              <p className="text-xl text-indigo-100 mb-8">Get the latest travel deals and updates straight to your inbox.</p>
              <form className="max-w-md mx-auto">
                <div className="flex">
                  <input
                    type="email"
                    required
                    className="flex-grow px-4 py-3 rounded-l-md focus:outline-none focus:ring-2 focus:ring-indigo-300"
                    placeholder="Enter your email"
                  />
                  <button
                    type="submit"
                    className="bg-indigo-800 text-white px-6 py-3 rounded-r-md hover:bg-indigo-700 transition duration-300"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </section>

  )
}

export default NewsletterSubscribe