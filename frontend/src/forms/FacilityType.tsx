
import {motion} from 'framer-motion'
import { predefinedFacilities } from '../config/hotel-facilities-config'
import { HotelOtherType } from './HotelDetailsSection'

type PropType ={
    formData:HotelOtherType,
    handleFacilityToggle : (facility:string)=> void
}


const FacilityType = ({formData , handleFacilityToggle}:PropType) => {
  return (
    <div className="space-y-4">
    <label className="text-lg font-semibold block">Facilities</label>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {predefinedFacilities.map((facility) => (
        <motion.button
          key={facility.name}
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleFacilityToggle(facility.name)}
          className={`p-4 rounded-lg flex flex-col items-center justify-center space-y-2 transition-colors ${
            formData.facilities.includes(facility.name)
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <facility.icon className="w-6 h-6" />
          <span className="text-sm font-medium">{facility.name}</span>
        </motion.button>
      ))}
    </div>
  </div>
  )
}

export default FacilityType