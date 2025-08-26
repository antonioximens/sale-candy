import { Router } from "express";
import { userRoutes } from "./userRoutes";

const router = Router()

// rotas de users
router.use("/api", userRoutes)

// renomeando para mainRouter
export { router as mainRouter };