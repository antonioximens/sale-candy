import {PrismaClient} from "@prisma/client"

// fazendo a conexão com o banco de dados
// e consegue usar no repositorio as funções do prisma 
export const prisma = new PrismaClient()