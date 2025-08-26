import { Handler } from "express";
import { UserService } from "../service/UserService";
import { HttpError } from "../errors/Http-Error";
import { checkEmailZod } from "./schemas/checkEmail";
import { createUserZod } from "./schemas/createUser";

export class UserController {
    // injeção de dependencia
    constructor(private readonly userService: UserService){}

    // metodos do controller:
    // traz todos os usuarios
    index: Handler = async (req, res, next) => {
        try {
            // trazendo todos os users
            const users = await this.userService.getAllUsers()
            res.status(200).json(users ?? []) 

        } catch (error) {
            // encaminha o erro global 
            next(error)
        }
    }
    // traz um usuario pelo email
    showById: Handler = async (req, res, next) => {
        try {
            const {email} = checkEmailZod.parse(req.params)
            const user = await this.userService.getFindByEmail(email.toLowerCase())
            if(!user) throw new HttpError(404, `User with email ${email} not found!`)      
            res.status(200).json(user)
        } catch (error) {
            next(error)
        }
    }
    // criado um user 
    create: Handler = async (req, res, next) => {
    try {
        // valida body
        const body = createUserZod.parse(req.body);

        // cria usuário (service deve fazer hash)
        const newUser = await this.userService.createUser(body);

        if (!newUser) throw new HttpError(400, "Failed to create user");

        // remove senha do retorno
        const { password, ...userWithoutPassword } = newUser;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(error);
    }
}


}