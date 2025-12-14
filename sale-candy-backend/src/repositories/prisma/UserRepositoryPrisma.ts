import { User } from "@prisma/client";
import { CreateUserDTO, UserRepository } from "../UserRepository";
import { prisma } from "../../../prisma/database";

export class UserRepositoryPrisma implements UserRepository {
  /**
   * Retorna todos os usuários cadastrados
   * GET /api/users
   */
  async findAll(): Promise<User[]> {
    return prisma.user.findMany();
  }

  /**
   * Busca um usuário pelo email
   * Email é único no banco
   * GET /api/users/:email
   */
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  /**
   * Busca um usuário pelo ID
   * GET /api/users/:id
   */
  async findById(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    });
  }

  /**
   * Cria um novo usuário
   * OBS: senha já deve vir tratada (hash) pelo Service
   * POST /api/users
   */
  async create(params: CreateUserDTO): Promise<User> {
    const { name, email, password, role } = params;

    return prisma.user.create({
      data: {
        name, // nome do usuário
        email, // email único
        password, // senha já criptografada
        role, // perfil do usuário (ADMIN | STANDARD)
      },
    });
  }

  /**
   * Atualiza dados de um usuário
   * Atualiza apenas os campos enviados
   * PUT /api/users/:id
   */
  async update(
    id: number,
    params: Partial<CreateUserDTO>
  ): Promise<User | null> {
    // Objeto de atualização montado dinamicamente
    const data: any = {};

    // Atualiza nome se enviado
    if (params.name !== undefined) {
      data.name = params.name;
    }

    // Atualiza email se enviado
    if (params.email !== undefined) {
      data.email = params.email;
    }

    // Atualiza senha se enviada (já deve estar hashada)
    if (params.password !== undefined) {
      data.password = params.password;
    }

    // Atualiza role se enviado
    if (params.role !== undefined) {
      data.role = params.role;
    }

    return prisma.user.update({
      where: { id }, // identifica o usuário
      data, // dados tratados
    });
  }

  /**
   * Remove um usuário
   * DELETE /api/users/:id
   * OBS: se houver Orders relacionadas,
   * o delete só funcionará com cascade ou exclusão prévia
   */
  async delete(id: number): Promise<User | null> {
    return prisma.user.delete({
      where: { id },
    });
  }
}
