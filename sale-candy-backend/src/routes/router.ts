import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { productRoutes } from "./productRoutes";

const router = Router();

// rotas de users
router.use("/api", userRoutes);
// rotas de products
router.use("/api", productRoutes);

// renomeando para mainRouter
export { router as mainRouter };
