import { Request, Response, NextFunction } from "express";
import ForbiddenException from "@/exceptions/forbidden";
import { AuthReq } from "./auth.middleware";
import prisma from "@/config/database";
import ErrorCode from "@/constants/error-code";

const superadminMiddleware = async (req: Request, _res: Response, next: NextFunction) => {
  const userRoleSuperadmin = await prisma.user.findMany({
    where: {
      role: "SUPERADMIN",
    },
  });
  if (userRoleSuperadmin.length === 0) {
    return next();
  }
  const user = (req as AuthReq).user;
  if (user.role !== "SUPERADMIN") {
    return next(new ForbiddenException("Access denied. Only Superadmin has permission", ErrorCode.FORBIDDEN));
  }
  next();
};

export default superadminMiddleware;
