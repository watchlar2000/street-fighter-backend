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
        throw new Error("Missing required fields");
      }

      const user = await authService.login({ email });

      const isPasswordCorrect = user.password === password;

      if (!isPasswordCorrect) {
        throw new Error("Wrong password");
      }

      const data = user;
      res.data = data;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
