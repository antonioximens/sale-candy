import { HttpError } from "../errors/Http-Error";
import { CreateUserDTO, UserRepository } from "../repositories/UserRepository";

export class UserService {
  // injeção de dependencia, pegando os dados do UserRepository
  constructor(private readonly userRepository: UserRepository) {}

  // procura usuario, evitando redundancia
  async verifyUser(id: number) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) throw new HttpError(404, "User not found!");
    return userExists;
  }

  // retorna todos os usuarios
  async getAllUsers() {
    return await this.userRepository.findAll();
  }

  // verifica se o email existe, caso nao lança erro
  async getFindByEmail(email: string) {
    const emailExists = await this.userRepository.findByEmail(email);
    if (!emailExists) throw new HttpError(404, "E-mail not found!");
    return emailExists;
  }

  // procurnado por id
  async getFindById(id: number) {
    // procura o user pelo id
    // nao encontrou lança erro
    return await this.verifyUser(id);
  }

  // criação de um usuario, lembrando que valor inicial é standard
  async createUser(params: CreateUserDTO) {
    // aqui não há necessidade de verificar se está sem valor
    // por conta que no defalut do prisma coloquei "STANDARD"
    const emailExists = await this.userRepository.findByEmail(params.email);
    if (emailExists) throw new HttpError(409, "found email conflict");
    return await this.userRepository.create(params);
  }
  // atualizando dados do usuario
  async updateUser(id: number, params: Partial<CreateUserDTO>) {
    await this.verifyUser(id);
    return await this.userRepository.update(id, params);
  }

  // deletando um usuario
  async deleteUser(id: number) {
    await this.verifyUser(id);
    return await this.userRepository.delete(id);
  }
}
