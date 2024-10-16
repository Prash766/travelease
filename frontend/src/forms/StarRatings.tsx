import {motion} from 'framer-motion'
import { Star } from 'lucide-react'
import { HotelOtherType } from './HotelDetailsSection'
type PropType={
    formData: HotelOtherType
    handleStar: (star: number)=> void
}

const StarRatings = ({handleStar , formData}: PropType) => {
  return (
    <div className="space-y-2">
    <label htmlFor="starRating" className="text-lg font-semibold block">Star Rating</label>
    <div className="flex justify-between items-center text-4xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={()=> handleStar(star)}
          className={`cursor-pointer ${formData.starRating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          <Star fill={`${formData.starRating >= star ? '#FFFF00' : '#808080'}`} />
        </motion.button>
      ))}
    </div>
      {formData.starRating===0? <div className='mt-4 text-red-500 text-sm'>Select the Star Rating</div>: null}
  </div>
  )
}

export default StarRatings