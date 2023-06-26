import { FIGHTER } from "../models/fighter.js";
import {
  getDefinedFields,
  getNonExistingFields,
  hasNoEmptyStringValues,
  isObjEmpty,
  setFighterHealth,
  verifyFighterDefense,
  verifyFighterHealth,
  verifyFighterPower,
} from "../utils/index.js";

const createFighterValid = (req, res, next) => {
  const { name, health: fighterHealth, power, defense } = req.body;

  const health = setFighterHealth(fighterHealth);

  const fighterBody = {
    name,
    health,
    power,
    defense,
  };

  try {
    if (req.body.id) {
      throw new Error("ID field should not be present in the body");
    }

    const isValidBody = hasNoEmptyStringValues(fighterBody);

    if (!Object.keys(req.body).length || !isValidBody) {
      const errorMessage =
        "Missing required fields. The required fields are: name, power, and defense.";
      throw new Error(errorMessage);
    }

    const nonExistingFields = getNonExistingFields(req.body, FIGHTER);

    if (nonExistingFields.length) {
      throw new Error("Extra fields are not allowed");
    }

    const isPowerValid = verifyFighterPower(power);

    if (!isPowerValid) {
      throw new Error("Power should be within the 1-100 range");
    }

    const isDefenseValid = verifyFighterDefense(defense);

    if (!isDefenseValid) {
      throw new Error("Defense should be within the 1-10 range");
    }

    const isHealthValid = verifyFighterHealth(health);

    if (!isHealthValid) {
      throw new Error("Health should be within the 80-120 range");
    }
  } catch ({ message }) {
    res.error = message;
  } finally {
    next();
  }
};

const updateFighterValid = (req, res, next) => {
  try {
    const { name, health, power, defense } = req.body;

    const fighterBody = {
      name,
      health,
      power,
      defense,
    };

    if (req.body.id) {
      throw new Error("ID field should not be present in the body");
    }

    const isValidBody = getDefinedFields(fighterBody);

    if (isObjEmpty(isValidBody)) {
      throw new Error(
        "At least one field from the fighter model must be present",
      );
    }

    res.data = isValidBody;
  } catch ({ message }) {
    res.error = message;
  } finally {
    next();
  }
};

export { createFighterValid, updateFighterValid };
