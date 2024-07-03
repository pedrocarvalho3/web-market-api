import { Request, Response } from "express";
import { userRepository } from "../repositories/userRepository";

export class UserController {
  async create(req: Request, res: Response) {
    const { name, email, password, userType } = req.body;

    if (!name || !email || !password || !userType) {
      return res
        .status(400)
        .json({ message: "Todos os campos são obrigatórios" });
    }

    try {
      const newUser = await userRepository.create({
        name,
        email,
        password,
        userType,
      });
      await userRepository.save(newUser);

      return res.status(201).json(newUser);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao criar usuário" });
    }
  }

  async listUsers(req: Request, res: Response) {
    try {
      const users = await userRepository.find();
      return res.status(200).json(users);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao buscar usuários" });
    }
  }
}
