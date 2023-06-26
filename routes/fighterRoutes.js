import { Router } from "express";
import {
  createFighterValid,
  updateFighterValid,
} from "../middlewares/fighter.validation.middleware.js";
import { responseMiddleware } from "../middlewares/response.middleware.js";
import { fighterService } from "../services/fighterService.js";
import { setFighterHealth } from "../utils/index.js";

const router = Router();

router.get(
  "/",
  async (req, res, next) => {
    const fightersList = await fighterService.getFightersList();
    res.data = fightersList;
    next();
  },
  responseMiddleware,
);

router.get(
  "/:id",
  async (req, res, next) => {
    try {
      const { id: fighterId } = req.params;
      const fighter = await fighterService.getFighterById(fighterId);
      res.data = fighter;
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
  updateFighterValid,
  async (req, res, next) => {
    try {
      const resError = res.error;

      if (resError) {
        throw new Error(resError);
      }

      const { id: fighterId } = req.params;
      await fighterService.getFighterById(fighterId);

      const { data: fighterUpdatedData } = res;
      const updatedFighter = await fighterService.updateFighterById(
        fighterId,
        fighterUpdatedData,
      );

      res.data = updatedFighter;
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
      const { id: fighterId } = req.params;
      await fighterService.getFighterById(fighterId);

      const deletedFighter = await fighterService.deleteFighterById(fighterId);

      res.data = deletedFighter;
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
  createFighterValid,
  async (req, res, next) => {
    try {
      const resError = res.error;

      if (resError) {
        throw new Error(resError);
      }

      const { name, health } = req.body;

      const isNameExisting = await fighterService.search({ name });

      if (isNameExisting) {
        throw new Error("Fighter with this name is already existing");
      }

      const fighterBody = { ...req.body, health: setFighterHealth(health) };

      const createdFighter = await fighterService.createFighter(fighterBody);
      res.data = createdFighter;
    } catch ({ message }) {
      res.error = message;
    } finally {
      next();
    }
  },
  responseMiddleware,
);

export { router };
