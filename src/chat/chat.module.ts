import { Module } from "@nestjs/common";
import { MyGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Reports } from "src/reports/reports.entity";
import { ReportsService } from "src/reports/reports.service";
import { CoinHistory } from "src/coin-history/coin-history.entity";
import { CoinHistoryService } from "src/coin-history/coin-history.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Reports]),
    TypeOrmModule.forFeature([CoinHistory]),
  ],
  controllers: [],
  providers: [
    MyGateway,
    ChatService,
    UsersService,
    ReportsService,
    CoinHistoryService,
  ],
})
export class GatewayModule {}
