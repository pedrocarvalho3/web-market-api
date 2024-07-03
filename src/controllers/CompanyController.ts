import { Request, Response } from "express";
import { companyRepository } from "../repositories/companyRepository";
import { userRepository } from "../repositories/userRepository";
import { productRepository } from "../repositories/productRepository";

export class CompanyController {
  async create(req: Request, res: Response) {
    const { name, cnpj, description, profileImage } = req.body;
    const { userId } = req.params;

    if (!name || !cnpj || !description || !userId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await userRepository.findOneBy({ id: Number(userId) });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newCompany = companyRepository.create({
        name,
        cnpj,
        description,
        profileImage,
        user: user,
      });

      await companyRepository.save(newCompany);

      return res.status(201).json(newCompany);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listCompanies(req: Request, res: Response) {
    try {
      const companies = await companyRepository.find();

      const mappedCompanies = companies.map((company) => ({
        id: company.id,
        name: company.name,
        cnpj: company.cnpj,
        description: company.description,
        profileImage: company.profileImage,
      }));

      return res.status(200).json(mappedCompanies);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
