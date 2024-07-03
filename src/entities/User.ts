import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Company } from "./Company";
import { Order } from "./Order";

@Entity("user")
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  email: string;

  @Column({ type: "text" })
  password: string;

  @Column({ type: "text" })
  userType: string;

  @OneToOne(() => Company, (company) => company.user)
  company: Company;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
