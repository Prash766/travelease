
# TravelEase

A production-ready hotel booking application built using the MERN stack with TypeScript, and modern web development practices. This platform is designed to handle real-world scenarios with features like secure payments, efficient data management, and responsive user experience.  

**Live Demo**: (https://travelease-ashy.vercel.app/)



---

## Key Features and Implementations  

### Frontend  
- **React.js with TypeScript**: Built a type-safe and scalable user interface.  
- **React Query**: Efficiently managed server state and asynchronous requests for data fetching and caching.  
- **Framer Motion**: Added smooth animations to enhance user experience, including transitions and interactive UI elements.  
- **React Hook Form**: Simplified form handling with built-in validation for user inputs.  
- **Tailwind CSS**: Designed a fully responsive, modern UI with utility-first styling.  

### Backend  
- **Node.js and Express.js**: Developed a scalable and performant server for handling API requests.  
- **MongoDB with Mongoose**: Used a NoSQL database to store user, booking, and property data with schema validation.  
- **Stripe Integration**: Enabled secure payment processing for booking accommodations.  
- **Server-Side Pagination**: Efficiently handled large datasets, improving loading times and performance.  
- **Image Hosting with Cloudinary**: Managed and delivered optimized property images.  

### Testing  
- **End-to-End Testing with Playwright**: Wrote comprehensive tests to ensure flawless functionality and a bug-free experience from the user’s perspective. 

### Advanced Filtering and Sorting
Implemented search filters and sorting options to enhance the user experience. Users can filter hotels based on factors like location (country), price range, star rating, facilities, and hotel type. The app also supports sorting results by price (high to low or low to high), making it easy to find accommodations that meet specific preferences.


### Additional Features  
- **TypeScript Everywhere**: Ensured type safety across both frontend and backend, reducing runtime errors.  
- **Production-Level Performance**: Optimized APIs and UI for fast loading times and responsiveness.  
- **Responsive Design**: Ensured the platform adapts seamlessly to various devices and screen sizes.  

---

## Installation  

1. Clone the repository:  
   ```bash  
   git clone https://github.com/yourusername/hotel-booking-platform.git  
   cd hotel-booking-platform  
   ```  

2. Install dependencies for both backend and frontend:  
   ```bash  
   npm install  
   cd client && npm install  
   ```  

3. Set up environment variables in a `.env` file:  

### Frontend  
Create a `.env` file in the `client` directory with the following:  
```env  
VITE_API_BASE_URL=http://localhost:3000/api/v1  
VITE_STRIPE_PUB_KEY=your_stripe_public_key  
```  

### Backend  
Create a `.env` file in the root directory with the following:  
```env  
MONGODB_URL=your_mongodb_connection_string  
JWT_SECRET_KEY=your_jwt_secret_key  
FRONTEND_URL=http://localhost:5173  

CLOUDINARY_NAME=your_cloudinary_name  
CLOUDINARY_API_KEY=your_cloudinary_api_key  
CLOUDINARY_API_SECRET=your_cloudinary_api_secret  

STRIPE_API_KEY=your_stripe_secret_key  
```  

4. Start the application:  
   - Backend:  
     ```bash 
     cd backend &&
     npm run dev  
     ```  
   - Frontend:  
     ```bash  
     cd frontend && npm run dev  
     ```  

---
