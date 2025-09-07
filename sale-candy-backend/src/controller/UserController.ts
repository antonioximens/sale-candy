import { Handler } from "express";
import { UserService } from "../service/UserService";
import { HttpError } from "../errors/Http-Error";
import { checkEmailZod } from "./schemas/Users/checkEmail";
import { createUserZod } from "./schemas/Users/createUser";
import { updateUserZod } from "./schemas/Users/updateUser";

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
    // metodo update
    update: Handler =  async (req, res, next) => {
        try {
            // capturando o id
            const id = Number(req.params.id)
            // verificando o erro
            if (isNaN(id)) throw new HttpError(400, "ID invalid")

            // capturando os dados do body e validando no zod
            const body = updateUserZod.parse(req.body)

            // procura pelo id para verificar se existe
            const userExists = await this.userService.getFindById(id)
            // caso não exive erro
            if(!userExists) throw new HttpError(404, "User not found!")
            // se for true passa e atualiza o dado    
            const updatedUser = await this.userService.updateUser(id, body)

            res.status(200).json(updateUserZod)
            
        } catch (error) {
            next(error)
        }
    }

        // metodo delete
        delete: Handler = async (req, res , next) => {
            try {    
            // capturando o id
            const id = Number(req.params.id)
            // verificando o erro
            if (isNaN(id)) throw new HttpError(400, "Invalid ID")

            // buscando pelo id
            const userExists = await this.userService.getFindById(id)
            // caso nao existir lança erro
            if (!userExists) throw new HttpError(404, "User not found!")
            // deletando o user
            await this.userService.deleteUser(id)
            // nao retornando o user deletado 
            res.status(204).send()

            } catch (error) {
                next(error)
            }
        }
}