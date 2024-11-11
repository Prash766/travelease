import { Router } from "express";
import { upload } from "../middleware/multer.middleware";
import {
  addHotel,
  getHotelById,
  getHotelInfo,
  getHotelsOfUser,
  getMyHotelBookings,
  hotelBooking,
  searchHotels,
  stripePaymentIntent,
  updateHotelInfo,
} from "../controller/hotel.controller";
import { validateToken } from "../middleware/auth.middleware";
import { body } from "express-validator";
const router = Router();

router
  .route("/add")
  .post(
    upload.array("imageFiles", 6),
    [
      body("name").notEmpty().withMessage("Name is requried"),
      body("city").notEmpty().withMessage("City  is requried"),
      body("country").notEmpty().withMessage("Country is requried"),
      body("description").notEmpty().withMessage("description is requried"),
      body("type").notEmpty().withMessage("Type is requried"),
      body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price  is requried"),
      body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilites are requried"),
      body("imageFiles")
        .notEmpty()
        .isArray()
        .withMessage("Images  are requried"),
      body("starRating")
        .notEmpty()
        .isNumeric()
        .withMessage("Star rating is required"),
    ],
    validateToken,
    addHotel
  );

router.route("/").get(validateToken, getHotelsOfUser);
router.route("/:id").get(validateToken, getHotelInfo);
router
  .route("/edit/:id")
  .put(
    upload.array("imageFiles", 6),
    [
      body("name").notEmpty().withMessage("Name is required"),
      body("city").notEmpty().withMessage("City is required"),
      body("country").notEmpty().withMessage("Country is required"),
      body("description").notEmpty().withMessage("Description is required"),
      body("type").notEmpty().withMessage("Type is required"),
      body("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price is required"),
      body("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
      body("imageFiles")
        .optional()
        .isArray()
        .withMessage("Images are required"),
      body("starRating")
        .notEmpty()
        .isNumeric()
        .withMessage("Star rating is required"),
    ],
    validateToken,
    updateHotelInfo
  );

router.route("/query/search").get(searchHotels);
router.route("/get/:hotelId").get(getHotelById);
router
  .route("/:hotelId/bookings/payment-intent")
  .post(validateToken, stripePaymentIntent);

router.route("/:hotelId/bookings").post(validateToken, hotelBooking)
router.route("/myBookings").get(validateToken, getMyHotelBookings)

export default router;
