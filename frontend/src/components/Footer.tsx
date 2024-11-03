import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <footer className="bg-indigo-900 text-white  py-8 mt-12">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="md:ml-10">
          <h3 className="text-xl font-semibold mb-4">About TravelEase</h3>
          <p>Discover the world with ease. TravelEase offers the best deals on hotels, flights, and more.</p>
        </div>
        <div className="md:ml-10">
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to='/about' className="hover:underline">About Us</Link></li>
            <li><Link to='/contact' className="hover:underline">Contact</Link></li>
            <li><Link to='/faq' className="hover:underline">FAQs</Link></li>
            <li><Link to='/policy' className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>
        <div className="md:ml-10">
          <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
          <p className="mb-2">Stay updated with our latest offers</p>
          <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full sm:w-auto bg-primary-foreground text-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-primary-foreground"
              aria-label="Email for newsletter"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary focus:ring-secondary"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </footer>
  )
}