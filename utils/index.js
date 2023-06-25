const hasNoEmptyStringValues = (obj) => {
  for (const key in obj) {
    if ((typeof obj[key] === "string" && obj[key].trim() === "") || !obj[key]) {
      return false;
    }
  }
  return true;
};

const getNonExistingFields = (body, entity) => {
  return Object.keys(body).filter(
    (field) => !Object.keys(entity).includes(field),
  );
};

const verifyPhoneNumber = (phoneNumber) => {
  if (!phoneNumber.startsWith("+380") && phoneNumber.length !== 13) {
    return false;
  }

  return true;
};

const verifyPassword = (password) => {
  if (password.length < 3) {
    return false;
  }

  return true;
};

const hasAllowedDomain = (email) => {
  const allowedDomain = "@gmail.com";
  return email.endsWith(allowedDomain);
};

export {
  getNonExistingFields,
  hasAllowedDomain,
  hasNoEmptyStringValues,
  verifyPhoneNumber,
  verifyPassword,
};
