import { Router } from "express";
import { registerUser } from "../controller/user.controller";
import { check } from "express-validator";

const router = Router();

router
  .route("/register")
  .post(
    [
      check("firstName", "FirstName is Required").isString(),
      check("lastName", "Last Name is Required").isString(),
      check("email", "Email is Required").isEmail(),
      check("password", "Password with 6 or more characters required").isLength({
        min:6,
      }),
    ],
    registerUser
  );

export default router;
