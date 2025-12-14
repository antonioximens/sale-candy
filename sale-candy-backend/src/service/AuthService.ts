import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { HttpError } from "../errors/Http-Error";
import { UserRepository } from "../repositories/UserRepository";

interface AuthResponse {
  token: string;
}

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async login(email: string, password: string): Promise<AuthResponse> {
    // verifica se usuário existe
    const user = await this.userRepository.findByEmail(email);
    if (!user) throw new HttpError(404, "User not found");

    // compara senha
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new HttpError(401, "Invalid credentials");

    // gera token com role
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role, // ADMIN ou STANDARD
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return { token };
  }
}
