import { User } from "@prisma/client";
import { CreateUserDTO, UserRepository } from "../UserRepository";
import { prisma } from "../../../prisma/database";

// implementando as funções que passei no UserReposaitory
export class UserRepositoryPrisma implements UserRepository{

    // retornando todos os usuarios 
    // GET api/users
    async findAll(): Promise<User[]> {
        return prisma.user.findMany()
    }

    // retornando um usuario especifioco pelo email
    // já que ele é unico, como coloquei na tabela de User
    // GET api/users/:email
    async findByEmail(email: string): Promise<User | null>{
        return prisma.user.findUnique({where: {email}})
    }

    // procurnado pelo id
    // GET api/users/:id
    findById(id: number):Promise<User | null>{
        return prisma.user.findUnique({where: {id}})
    }
    
    // criando um usuario.
    // POST api/users
    async create(params: CreateUserDTO): Promise<User>{
        return prisma.user.create({data: params})
    }

    // atualizando os dados do usuarios
    // PUT api/users/:id
    async update(id: number, params: Partial<CreateUserDTO>): Promise<User | null>{
        return prisma.user.update({
            where: {id},
            data: params
        })
    }
    
    // deletando os dados do usuario
    // DELETE api/users/:id
    async delete(id: number): Promise<User | null>{
        return prisma.user.delete({where: {id}})
    }

}