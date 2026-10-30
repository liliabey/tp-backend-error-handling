import { AppError } from "../errors/AppError.js";
import { ERROR_CODES } from "../errors/errorCodes.js";

export const notFound = (req, res, next) => {
  next(
    new AppError(
      `Cannot find ${req.originalUrl} on this server`,
      404,
      ERROR_CODES.RESOURCE_NOT_FOUND,
    ),
  );
};
