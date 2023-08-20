/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "../card/card.entity";
import { Promotion } from "../promotion/promotion.entity";
import { Transaction } from "../transaction/transaction.entity";

@Entity()
export class Balance {
  @PrimaryColumn()
  id: number;

  @Column({ default: 0 })
  counter: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  promotionId: number;

  @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.balances)
  @JoinColumn()
  promotion!: Promotion;

  @Column({ nullable: true })
  cardId: number;

  @ManyToOne(() => Card, (card: Card) => card.balances)
  @JoinColumn()
  card!: Card;

  @OneToMany(
    () => Transaction,
    (transaction: Transaction) => transaction.balance
  )
  transactions!: Array<Transaction>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
