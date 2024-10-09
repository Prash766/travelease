import { Router } from "express";
import { registerUser, loginUser , authCheck } from "../controller/user.controller";
import { check } from "express-validator";
import { validateToken } from "../middleware/auth.middleware";

const router = Router();

router.route("/register").post(
  [
    check("firstName", "FirstName is Required").isString(),
    check("lastName", "Last Name is Required").isString(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  registerUser
);

router
  .route("/login")
  .post(
    [
      check("email", "Enter Email").isString(),
      check("password", "Password with 6 or more character required"),
    ],
    loginUser
  );

router.route("/validate-token").get(validateToken , authCheck)




export default router;
