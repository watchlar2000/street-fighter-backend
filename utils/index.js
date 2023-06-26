const hasNoEmptyStringValues = (obj) => {
  for (const key in obj) {
    if ((typeof obj[key] === "string" && obj[key].trim() === "") || !obj[key]) {
      return false;
    }
  }
  return true;
};

const getDefinedFields = (body) => {
  const filteredObj = {};

  for (const [key, value] of Object.entries(body)) {
    if (value !== undefined) {
      filteredObj[key] = value;
    }
  }

  return filteredObj;
};

const isObjEmpty = (obj) => {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) return false;
  }

  return true;
};

const getNonExistingFields = (body, entity) => {
  return Object.keys(body).filter(
    (field) => !Object.keys(entity).includes(field),
  );
};

const verifyPhoneNumber = (phoneNumber) => {
  if (phoneNumber.startsWith("+380") && phoneNumber.length === 13) {
    return true;
  }

  return false;
};

const verifyPassword = (password) => {
  if (password.length > 3) {
    return true;
  }

  return false;
};

const hasAllowedDomain = (email) => {
  const allowedDomain = "@gmail.com";
  return email.endsWith(allowedDomain);
};

const verifyFighterPower = (power) => {
  if (power >= 1 && power <= 100) {
    return true;
  }

  return false;
};

const verifyFighterDefense = (defense) => {
  if (defense >= 1 && defense <= 10) {
    return true;
  }

  return false;
};

const verifyFighterHealth = (health) => {
  if (health >= 80 && health <= 120) {
    return true;
  }

  return false;
};

const setFighterHealth = (health) => {
  if (health === undefined) {
    return "100";
  }

  return health;
};

const responseHandler = (response) => {
  if (!response) {
    return null;
  }
  return response;
};

export {
  getDefinedFields,
  getNonExistingFields,
  hasAllowedDomain,
  hasNoEmptyStringValues,
  isObjEmpty,
  responseHandler,
  setFighterHealth,
  verifyFighterDefense,
  verifyFighterHealth,
  verifyFighterPower,
  verifyPassword,
  verifyPhoneNumber,
};
