import { Request, Response, NextFunction } from "express";
import { HttpError } from "../errors/Http-Error";

export function ensureAdmin(
  req: Request & { user?: { role?: string } },
  res: Response,
  next: NextFunction
) {
  if (req.user?.role !== "ADMIN") {
    throw new HttpError(403, "Admin access only");
  }

  return next();
}
