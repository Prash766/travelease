import { Link } from "react-router-dom"
import {motion} from 'framer-motion'

const Header = ({bgTransparent}) => {
  
  return (


    <header className={`${bgTransparent? "bg-transparent" : "bg-indigo-900"} text-white p-4 absolute w-full z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          <motion.h1 
            className="text-4xl font-bold"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            TravelEase
          </motion.h1>
          <nav>
            <motion.ul 
              className="flex space-x-4"
              initial="initial"
              animate="animate"
            >
            <Link to='/login' className="flex text-black font-semibold justify-center items-center px-5 p-3 bg-white  rounded-lg hover:bg-slate-100">Login</Link>
            <Link to='/sign-up' className="flex text-black font-semibold justify-center items-center px-4 bg-white  rounded-lg hover:bg-slate-100">Signup</Link>            </motion.ul>
          </nav>
        </div>
      </header>
  )
}

export default Header

