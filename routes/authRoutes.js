import { Router } from "express";
import { authService } from "../services/authService.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { userService } from "../services/userService.js";
import { hasNoEmptyStringValues } from "../utils/index.js";

const router = Router();

router.post(
  "/login",
  async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        const errorMessage = "Missing required fields";
        throw Error(errorMessage);
      }

      const isEmailExisting = await userService.search({ email });

      if (!isEmailExisting) {
        const errorMessage = "No such user in the database. Please sign up";
        throw Error(errorMessage);
      }

      const user = await userService.search({ email });

      const isPasswordCorrect = user.password === password;

      if (!isPasswordCorrect) {
        const errorMessage = "Wrong password";
        throw Error(errorMessage);
      }

      const data = { message: "User has been loged in succesfully" };

      res.data = data;
    } catch (err) {
      res.err = err.message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
