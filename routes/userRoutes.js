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
    try {
      const usersList = await userService.getUsersList();

      if (usersList === null) {
        const errorMessage = "No users found in the database";
        throw Error(errorMessage);
      }

      res.data = { users: usersList };
    } catch (error) {
      res.error = error?.message ?? error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id: userId } = req.params;

      const user = await userService.getUserById(userId);

      if (user === null) {
        const errorMessage = "No user with such ID found in the database";
        throw Error(errorMessage);
      }

      res.data = user;
    } catch (error) {
      res.error = error?.message ?? error;
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
      const { id: userId } = req.params;

      const user = await userService.updateUserById(userId, res.data);

      if (user === null) {
        const errorMessage = "Something went wrong updating the user";
        throw Error(errorMessage);
      }

      res.data = user;
    } catch (error) {
      res.error = error?.message ?? error;
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

      const user = await userService.deleteUserById(userId);

      if (user === null) {
        const errorMessage = "Something went wrong deleting the user";
        throw Error(errorMessage);
      }

      res.data = user;
    } catch (error) {
      res.error = error?.message ?? error;
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
      const isResError = res.error;
      if (isResError) throw Error(isResError);

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
      res.error = error?.message ?? error;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
