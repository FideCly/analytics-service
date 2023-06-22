import { Module, forwardRef } from '@nestjs/common';
import { ShopModule } from 'src/shop/shop.module';
import { CardController } from './card.controller';
import { CardService } from './card.service';

@Module({
  controllers: [CardController],
  providers: [CardService],
  imports: [forwardRef(() => ShopModule)],
})
export class CardModule {}
