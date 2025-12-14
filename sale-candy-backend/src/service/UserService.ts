import bcrypt from "bcrypt";
import { HttpError } from "../errors/Http-Error";
import { CreateUserDTO, UserRepository } from "../repositories/UserRepository";

export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // método privado reutilizável para verificar existência do usuário
  private async verifyUser(id: number) {
    const user = await this.userRepository.findById(id);
    if (!user) throw new HttpError(404, "User not found");
    return user;
  }

  // lista todos os usuários
  async getAllUsers() {
    return this.userRepository.findAll();
  }

  // busca por email
  async getFindByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new HttpError(404, "E-mail not found");
    return user;
  }

  // cria usuário
  async createUser(params: CreateUserDTO) {
    // verifica se email já existe
    const emailExists = await this.userRepository.findByEmail(params.email);
    if (emailExists) throw new HttpError(409, "Email already exists");

    // hash da senha (REGRA DE NEGÓCIO)
    const hashedPassword = await bcrypt.hash(params.password, 10);

    return this.userRepository.create({
      ...params,
      password: hashedPassword,
      // role vem default do Prisma como STANDARD
    });
  }

  // atualização
  async updateUser(id: number, params: Partial<CreateUserDTO>) {
    await this.verifyUser(id);
    // se o usuário estiver alterando a senha
    if (params.password) {
      params.password = await bcrypt.hash(params.password, 10);
    }
    return this.userRepository.update(id, params);
  }

  // remoção
  async deleteUser(id: number) {
    await this.verifyUser(id);
    return this.userRepository.delete(id);
  }
}
