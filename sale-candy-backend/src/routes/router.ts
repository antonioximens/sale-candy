import { Router } from "express";
import { userRoutes } from "./userRoutes";
import { productRoutes } from "./productRoutes";
import { orderRoutes } from "./orderRoutes";
import { orderItemRoutes } from "./orderItemRoutes";

const router = Router();

// rotas de users
router.use("/api", userRoutes);
// rotas de products
router.use("/api", productRoutes);
// rotas de orders
router.use("/api", orderRoutes);
// rotas de orderItem
router.use("/api", orderItemRoutes);

// renomeando para mainRouter
export { router as mainRouter };
