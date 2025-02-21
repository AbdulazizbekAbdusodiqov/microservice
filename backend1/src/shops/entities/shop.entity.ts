import { Customer } from "src/customers/entities/customer.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity()
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Customer, (customer) => customer.id, { onDelete: "RESTRICT" })
  @JoinColumn({ name: "customerId" })
  customer: Customer;
}
