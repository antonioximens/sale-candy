/*
 * criação do contrato para mando ao prisma
 */
import { RoleTypeUser, User } from "@prisma/client";

// criando uma validação de parametros que deve seguir
export interface CreateUserDTO {
  name: string;
  email: string;
  password: string;
  role?: RoleTypeUser; // importei do prisma onde tinha criado um tipo
}

export interface UserRepository {
  findAll: () => Promise<User[]>;
  findByEmail: (email: string) => Promise<User | null>;
  findById: (id: number) => Promise<User | null>;
  create: (params: CreateUserDTO) => Promise<User>;
  update: (id: number, params: Partial<CreateUserDTO>) => Promise<User | null>;
  delete: (id: number) => Promise<User | null>;
}
