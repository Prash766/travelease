import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { addHotel } from "../controller/hotel.controller";
import { validateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
const router = Router()

router.route('/').post(upload.array("hotelImages", 6) ,validateToken,[
    body("name").notEmpty().withMessage("Name is requried"),
    body("city").notEmpty().withMessage("City  is requried"),
    body("country").notEmpty().withMessage("Country is requried"),
    body("description").notEmpty().withMessage("description is requried"),
    body("type").notEmpty().withMessage("Type is requried"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price  is requried"),
    body("facilities").notEmpty().isArray().withMessage("Facilites are requried"),
    body("imageUrls").notEmpty().isArray().withMessage("Images  are requried"),

],addHotel)
 
export default router 