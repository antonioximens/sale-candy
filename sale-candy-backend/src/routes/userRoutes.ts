import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserRepositoryPrisma } from "../repositories/prisma/UserRepositoryPrisma";
import { UserService } from "../service/UserService";


const router = Router();

// Instanciando repository
const userRepository = new UserRepositoryPrisma();

// Instanciando service
const userService = new UserService(userRepository);

// Instanciando controller passando o service
const userController = new UserController(userService);

//rotas
router.get("/users", userController.index);
router.get("/users/:email", userController.showById);

// renomeando e colocando a importação
export { router as userRoutes};
