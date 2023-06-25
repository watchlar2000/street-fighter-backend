const responseMiddleware = (req, res, next) => {
  const sendResponse = (statusCode = 200, data) => {
    res.status(statusCode).json(data);
  };

  if (res.err) {
    const data = { error: true, message: res.err };
    sendResponse(400, data);
  } else if (res.data) {
    sendResponse(undefined, res.data);
  } else {
    const message = "Requested data not found";
    const data = { error: true, message };
    sendResponse(404, data);
  }

  next();
};

export { responseMiddleware };
