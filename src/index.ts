import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { Env } from "./config/env.config";
import { HTTPSTATUS } from "./config/http.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { BadRequestException } from "./utils/app-error";
import { connectDatabase } from "./config/database.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import authRouter from "./routes/auth.routes";
import passport from "passport";
import { passportAuthenticateJwt } from "./config/passport.config";
import userRouter from "./routes/user.routes";

const BASE_PATH = Env.BASE_PATH;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

app.use(
  cors({
    origin: Env.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

app.get(
  "/",
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    throw new BadRequestException("mannual error !!");
    res.status(HTTPSTATUS.OK).json({
      message: "works !!",
    });
  }),
);

app.use(`${BASE_PATH}/auth`, authRouter);
app.use(`${BASE_PATH}/user`, passportAuthenticateJwt, userRouter);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(`Server running on ${Env.PORT} in ${Env.NODE_ENV} mode !!`);
});
