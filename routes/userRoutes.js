import { Router } from "express";
import { createUserValid } from "../middlewares/user.validation.middleware.js";
import { userService } from "../services/userService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";

const router = Router();

router.post(
  "/",
  createUserValid,
  async (req, res, next) => {
    try {
      const { email, phoneNumber } = req.body;

      const isEmailExisting = await userService.search({ email });

      if (isEmailExisting) {
        const errorMessage = "User with this email is already existing";
        throw Error(errorMessage);
      }

      const isPhoneNumberExisting = await userService.search({ phoneNumber });

      if (isPhoneNumberExisting) {
        const errorMessage = "User with this phone number is already existing";
        throw Error(errorMessage);
      }

      const createdUser = await userService.createUser(req.body);
      res.data = createdUser;
    } catch (error) {
      res.err = error.message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
