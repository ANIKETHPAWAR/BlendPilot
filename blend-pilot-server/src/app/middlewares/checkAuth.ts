import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import AppErr from "../errorhelpers/AppError";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new AppErr(StatusCodes.UNAUTHORIZED, "Please login first");
      }

      const token = authHeader.split(" ")[1]; // Extract the token
      if (!token) {
        throw new AppErr(StatusCodes.UNAUTHORIZED, "Please login first");
      }

      const verifyedToken = verifyToken(
        token, // Use the extracted token
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;

      const user = await User.findById(verifyedToken.userId);
      if (!user) {
        throw new AppErr(StatusCodes.NOT_FOUND, "User not found");
      }

      if (authRoles.length > 0 && !authRoles.includes(user.role as string)) {
        throw new AppErr(
          StatusCodes.FORBIDDEN,
          "You do not have access to this resource"
        );
      }

      req.user = verifyedToken;
      next();
    } catch (err) {
      next(err);
    }
  };
