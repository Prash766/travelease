import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-indigo-900 text-white p-8 mt-12">
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
      <div className="ml-10">
        <h3 className="text-xl font-semibold mb-4">About TravelEase</h3>
        <p>Discover the world with ease. TravelEase offers the best deals on hotels, flights, and more.</p>
      </div>
      <div className="ml-24">
        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
        <ul className="space-y-2">
          <li><Link to='/about' className="hover:underline">About Us</Link></li>
          <li><Link to='/contact' className="hover:underline">Contact</Link></li>
          <li><Link to='/faq' className="hover:underline">FAQs</Link></li>
          <li><Link to='/policy' className="hover:underline">Terms & Conditions</Link></li>
        </ul>
      </div>
      <div className="ml-20">
        <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
        <p className="mb-2">Stay updated with our latest offers</p>
        <form className="flex  ">
          <input type="email" placeholder="Enter your email" className=" text-black p-2 px-10 rounded-r-none focus:outline-none rounded-l-lg" />
          <button type="submit" className="rounded-l-none rounded-r-lg p-2  bg-indigo-600 hover:bg-indigo-700">Subscribe</button>
        </form>
      </div>
    </div>
  </footer>
  );
};

export default Footer;
