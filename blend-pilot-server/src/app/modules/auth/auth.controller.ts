import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { StatusCodes } from "http-status-codes";
import sendResponse from "../../utils/sendResponse";
import { authServices } from "./auth.service";

const credentialLogin = catchAsync(async (req: Request, res: Response) => {
  const loginInfo = await authServices.credentialLogin(req.body);

  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User login successfully",
    data: loginInfo,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = await authServices.getMe(req.user);
  sendResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User fetched successfully",
    data: user,
  });
});

export const authControllers = {
  credentialLogin,
  getMe,
};
