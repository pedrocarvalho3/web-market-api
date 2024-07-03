import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Order } from "./Order";

@Entity("product")
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "float" })
  price: number;

  // Relacionamento com Company
  @ManyToOne(() => Company, (company) => company.products)
  company: Company;

  @OneToMany(() => Order, (order) => order.product)
  orders: Order[];
}
