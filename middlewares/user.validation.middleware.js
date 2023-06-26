import { USER } from "../models/user.js";
import {
  getDefinedFields,
  getNonExistingFields,
  hasAllowedDomain,
  hasNoEmptyStringValues,
  isObjEmpty,
  verifyPassword,
  verifyPhoneNumber,
} from "../utils/index.js";

const createUserValid = (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  const userBody = {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
  };

  try {
    if (req.body.id) {
      throw new Error("ID field should not be present in the body");
    }

    const isValidBody = hasNoEmptyStringValues(userBody);

    if (!Object.keys(req.body).length || !isValidBody) {
      const error =
        "Missing required fields. The required fields are: firstName, lastName, email, phoneNumber, and password";
      throw new Error(error);
    }

    const nonExistingFields = getNonExistingFields(req.body, USER);

    if (nonExistingFields.length) {
      throw new Error("Extra fields are not allowed");
    }

    const isValidEmail = hasAllowedDomain(userBody.email ?? "");

    if (!isValidEmail) {
      throw new Error("Email is not valid and should end with '@gmail.com'");
    }

    const isValidPhone = verifyPhoneNumber(phoneNumber);

    if (!isValidPhone) {
      throw new Error("Phone number is not valid and should start with +380");
    }

    const isValidPassword = verifyPassword(password);

    if (!isValidPassword) {
      throw new Error("Password must contain of min 3 symbols");
    }
  } catch ({ message }) {
    res.error = message;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  try {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    const userBody = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    if (req.body.id) {
      throw new Error("ID field should not be present in the body");
    }

    const isValidBody = getDefinedFields(userBody);

    if (isObjEmpty(isValidBody)) {
      throw new Error("At least one field from the user model must be present");
    }

    res.data = isValidBody;
  } catch ({ message }) {
    res.error = message;
  } finally {
    next();
  }
};

export { createUserValid, updateUserValid };
