import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Company } from "./Company";

@Entity("signatures")
export class Signature {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Company, (company) => company.signatures)
  company: Company;

  @Column({ type: "text" })
  plan: string; // Básico, Premium, etc.

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  initialDate: Date;

  @Column({ type: "timestamp", nullable: true })
  endDate: Date;
}
