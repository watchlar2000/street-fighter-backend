import { Router } from "express";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import {
  createUserValid,
  updateUserValid,
} from "../middlewares/user.validation.middleware.js";
import { userService } from "../services/userService.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const usersList = await userService.getUsersList();
    res.data = usersList;
    next();
  },
  responseMiddleware,
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      const user = await userService.getUserById(userId);
      res.data = user;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.put(
  "/:id",
  updateUserValid,
  async (req, res, next) => {
    try {
      const resError = res.error;

      if (resError) {
        throw new Error(resError);
      }

      const { id: userId } = req.params;
      await userService.getUserById(userId);

      const { data: userUpdatedData } = res;
      const updatedUser = await userService.updateUserById(
        userId,
        userUpdatedData,
      );

      res.data = updatedUser;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.delete(
  "/:id",
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;
      await userService.getUserById(userId);

      const deletedUser = await userService.deleteUserById(userId);

      res.data = deletedUser;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.post(
  "/",
  createUserValid,
  async (req, res, next) => {
    try {
      const resError = res.error;

      if (resError) {
        throw new Error(resError);
      }

      const { email, phoneNumber } = req.body;
      const isEmailExisting = await userService.search({ email });

      if (isEmailExisting) {
        throw new Error("User with this email is already existing");
      }

      const isPhoneNumberExisting = await userService.search({ phoneNumber });

      if (isPhoneNumberExisting) {
        throw new Error("User with this phone number is already existing");
      }

      const createdUser = await userService.createUser(req.body);
      res.data = createdUser;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
