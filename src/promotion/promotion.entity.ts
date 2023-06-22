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
} from 'typeorm';
import { Balance } from '../balance/balance.entity';
import { Shop } from '../shop/shop.entity';

@Entity()
export class Promotion {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  checkoutLimit: number;

  @Column({
    type: 'timestamp',
    precision: 3,
    default: new Date(),
  })
  startAt: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  endAt: Date;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  shopId: number;

  @ManyToOne(() => Shop, (shop: Shop) => shop.promotions)
  @JoinColumn()
  shop!: Shop;

  @OneToMany(() => Balance, (balance: Balance) => balance.promotion)
  balances!: Array<Balance>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
