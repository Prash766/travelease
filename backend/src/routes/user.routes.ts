import { Router } from "express";
import { registerUser , loginUser } from "../controller/user.controller";
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

  router.route("/login").post(
    [
        check("email","Enter Email").isString(),
        check("password" ,"Password with 6 or more character required")

    ],
    loginUser
    


  )

export default router;