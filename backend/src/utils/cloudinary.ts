import {v2 as cloudinary} from 'cloudinary'
import fs  from 'fs'

export const uploadCloudinary = async(localPathFile : string)=>{
    console.log(localPathFile)
    try {
        if(!localPathFile) return null
        const res = await cloudinary.uploader.upload(localPathFile)
        fs.unlinkSync(localPathFile)
        return res
        
    } catch (error) {
        fs.unlinkSync(localPathFile)
        return null
        
    }

}