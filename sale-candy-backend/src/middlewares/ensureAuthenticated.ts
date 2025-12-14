import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { HttpError } from "../errors/Http-Error";

interface TokenPayload {
  id: number;
  role: "ADMIN" | "STANDARD";
  iat: number;
  exp: number;
}

// middleware base: apenas autenticado
export function ensureAuthenticated(
  req: Request & { user?: { id: number; role: "ADMIN" | "STANDARD" } },
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) throw new HttpError(401, "Token missing");

  const [, token] = authHeader.split(" ");

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as TokenPayload;

    // injeta dados no request
    req.user = {
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch {
    throw new HttpError(401, "Invalid token");
  }
}
