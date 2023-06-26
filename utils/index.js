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

const getNonExistingFields = (body) => {
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

export {
  getDefinedFields,
  getNonExistingFields,
  hasAllowedDomain,
  hasNoEmptyStringValues,
  isObjEmpty,
  verifyPassword,
  verifyPhoneNumber,
};
