/* eslint-disable @typescript-eslint/no-unused-vars */
import { Balance } from "../balance/balance.entity";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  balanceId: number;

  @ManyToOne(() => Balance, (balance: Balance) => balance.transactions)
  @JoinColumn()
  balance!: Balance;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
