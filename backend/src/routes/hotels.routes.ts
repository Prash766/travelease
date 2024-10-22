import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import { addHotel, getHotelInfo, getHotelsOfUser, updateHotelInfo } from "../controller/hotel.controller";
import { validateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
const router = Router()

router.route('/add').post(upload.array("imageFiles", 6) ,[
    body("name").notEmpty().withMessage("Name is requried"),
    body("city").notEmpty().withMessage("City  is requried"),
    body("country").notEmpty().withMessage("Country is requried"),
    body("description").notEmpty().withMessage("description is requried"),
    body("type").notEmpty().withMessage("Type is requried"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price  is requried"),
    body("facilities").notEmpty().isArray().withMessage("Facilites are requried"),
    body("imageFiles").notEmpty().isArray().withMessage("Images  are requried"),
    body("starRating").notEmpty().isNumeric().withMessage("Star rating is required")


],validateToken,addHotel)

router.route('/').get(validateToken, getHotelsOfUser )
router.route('/:id').get(validateToken , getHotelInfo)
router.route('/edit/:id').put(upload.array("imageFiles", 6) ,[
    body("name").notEmpty().withMessage("Name is requried"),
    body("city").notEmpty().withMessage("City  is requried"),
    body("country").notEmpty().withMessage("Country is requried"),
    body("description").notEmpty().withMessage("description is requried"),
    body("type").notEmpty().withMessage("Type is requried"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price  is requried"),
    body("facilities").notEmpty().isArray().withMessage("Facilites are requried"),
    body("imageFiles").notEmpty().isArray().withMessage("Images  are requried"),
    body("starRating").notEmpty().isNumeric().withMessage("Star rating is required")
],validateToken,addHotel)

export default router 