import { AppDataSource } from "../data-source";
import { Company } from "../entities/Company";

export const companyRepository = AppDataSource.getRepository(Company);
