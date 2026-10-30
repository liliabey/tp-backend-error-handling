import { logger } from "../logging/logger.js";
import { ERROR_CODES } from "./errorCodes.js";

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let errorCode = err.errorCode || ERROR_CODES.INTERNAL_SERVER_ERROR;
  let details = err.details || null;

  if (err.name === "CastError") {
    statusCode = 400;
    errorCode = ERROR_CODES.VALIDATION_ERROR;
  } else if (err.code === 11000) {
    statusCode = 409;
    errorCode = ERROR_CODES.DUPLICATE_RESOURCE;
  }

  const translatedMessage = req.t ? req.t(`errors.${errorCode}`) : err.message;

  logger.error(
    {
      err,
      errorCode,
      locale: req.locale,
      statusCode,
    },
    err.message || "An error occurred",
  );

  return res.status(statusCode).json({
    success: false,
    error: {
      code: errorCode,
      message: translatedMessage || err.message,
      details,
    },
  });
};
