import { Request, Response } from "express";

import { companyRepository } from "../repositories/companyRepository";
import { productRepository } from "../repositories/productRepository";

export class ProductController {
  async create(req: Request, res: Response) {
    const { name, description, price } = req.body;
    const { companyId } = req.params;

    if (!name || !description || !price || !companyId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const company = await companyRepository.findOneBy({
        id: Number(companyId),
      });

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      const newProduct = productRepository.create({
        name,
        description,
        price,
        company: company,
      });

      await productRepository.save(newProduct);

      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listAllProducts(req: Request, res: Response) {
    try {
      const products = await productRepository.find({
        relations: ["company"],
      });

      const mappedProducts = products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        companyName: product.company.name,
      }));

      return res.status(200).json(mappedProducts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async listProductsPerCompany(req: Request, res: Response) {
    const { companyId } = req.params;

    if (!companyId) {
      return res.status(400).json({ message: "Company ID is required" });
    }

    try {
      const company = await companyRepository.findOneBy({
        id: Number(companyId),
      });

      if (!company) {
        return res.status(404).json({ message: "Company not found" });
      }

      const products = await productRepository.find({
        where: { company: company },
      });

      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
