import { USER } from "../models/user.js";
import { userService } from "../services/userService.js";
import {
  getNonExistingFields,
  hasAllowedDomain,
  hasNoEmptyStringValues,
  verifyPhoneNumber,
  verifyPassword,
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

  if (req.body.id) {
    const errorMessage = "'id' field should not be present in the body";
    return next(errorMessage);
  }

  const isValidBody = hasNoEmptyStringValues(userBody);

  if (!Object.keys(req.body).length || !isValidBody) {
    const errorMessage = "Missing required fields";
    return next(errorMessage);
  }

  const nonExistingFields = getNonExistingFields(req.body, USER);

  if (nonExistingFields.length) {
    const errorMessage = "Extra fields are not allowed";
    return next(errorMessage);
  }

  const isValidEmail = hasAllowedDomain(userBody.email ?? "");

  if (!isValidEmail) {
    const errorMessage = "Email is not valid and should end with '@gmail.com'";
    return next(errorMessage);
  }

  const isValidPhone = verifyPhoneNumber(phoneNumber);

  if (!isValidPhone) {
    const errorMessage = "Phone number is not valid and should start with +380";
    return next(errorMessage);
  }

  const isValidPassword = verifyPassword(password);

  if (!isValidPhone) {
    const errorMessage = "Password must contain of min 3 symbols";
    return next(errorMessage);
  }

  next();
};

const updateUserValid = (req, res, next) => {
  // TODO: Implement validatior for user entity during update
  next();
};

export { createUserValid, updateUserValid };
