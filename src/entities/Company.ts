import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Product } from "./Product";
import { Signature } from "./Signature";
// import { Signature } from "./Signature";

@Entity("company")
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text" })
  cnpj: string;

  @Column({ type: "text" })
  description: string;

  @Column({ type: "jsonb", nullable: true })
  products: Product[];

  @Column({ type: "text", nullable: true })
  profileImage: string;

  @OneToOne(() => User, (user) => user.company)
  @JoinColumn()
  user: User;

  @OneToMany(() => Signature, (signature) => signature.company)
  signatures: Signature[];
}
