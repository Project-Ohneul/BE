import { Module } from "@nestjs/common";
import { CoinHistoryController } from "./coin-history.controller";
import { CoinHistoryService } from "./coin-history.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CoinHistory } from "./coin-history.entity";

@Module({
  imports: [TypeOrmModule.forFeature([CoinHistory])],
  controllers: [CoinHistoryController],
  providers: [CoinHistoryService],
})
export class CoinHistoryModule {}
