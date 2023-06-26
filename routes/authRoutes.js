import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { authService } from "../services/authService.js";

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

      const user = await authService.login({ email });

      const isPasswordCorrect = user.password === password;

      if (!isPasswordCorrect) {
        const errorMessage = "Wrong password";
        throw Error(errorMessage);
      }

      const data = { message: "User has been logged in succesfully" };
      res.data = data;
    } catch (error) {
      res.error = error?.message ?? error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
