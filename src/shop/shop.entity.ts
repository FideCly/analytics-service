/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from "../card/card.entity";
import { Promotion } from "../promotion/promotion.entity";

@Entity()
export class Shop {
  @PrimaryColumn()
  id: number;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Card, (card: Card) => card.shop)
  cards!: Array<Card>;

  @OneToMany(() => Promotion, (promotion: Promotion) => promotion.shop)
  promotions!: Array<Promotion>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
