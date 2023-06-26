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
      const errorMessage = "ID field should not be present in the body";
      throw Error(errorMessage);
    }

    const isValidBody = hasNoEmptyStringValues(userBody);

    if (!Object.keys(req.body).length || !isValidBody) {
      const errorMessage = "Missing required fields";
      throw Error(errorMessage);
    }

    const nonExistingFields = getNonExistingFields(req.body, USER);

    if (nonExistingFields.length) {
      const errorMessage = "Extra fields are not allowed";
      throw Error(errorMessage);
    }

    const isValidEmail = hasAllowedDomain(userBody.email ?? "");

    if (!isValidEmail) {
      const errorMessage =
        "Email is not valid and should end with '@gmail.com'";
      throw Error(errorMessage);
    }

    const isValidPhone = verifyPhoneNumber(phoneNumber);

    if (!isValidPhone) {
      const errorMessage =
        "Phone number is not valid and should start with +380";
      throw Error(errorMessage);
    }

    const isValidPassword = verifyPassword(password);

    if (!isValidPassword) {
      const errorMessage = "Password must contain of min 3 symbols";
      throw Error(errorMessage);
    }
  } catch (error) {
    res.error = error?.message ?? error;
  } finally {
    next();
  }
};

const updateUserValid = (req, res, next) => {
  try {
    const { id: userId } = req.params;

    if (!userId) {
      const errorMessage = "Please specidy an ID of the user";
      throw Error(errorMessage);
    }

    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (req.body.id) {
      const errorMessage = "ID field should not be present in the body";
      throw Error(errorMessage);
    }

    const userBody = {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    };

    const isValidBody = getDefinedFields(userBody);

    if (isObjEmpty(isValidBody)) {
      const errorMessage =
        "At least one field from the user model must be present";
      throw Error(errorMessage);
    }

    res.data = isValidBody;
  } catch (error) {
    res.error = error?.message ?? error;
  } finally {
    next();
  }
};

export { createUserValid, updateUserValid };
