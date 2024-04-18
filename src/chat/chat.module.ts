import {Module} from "@nestjs/common";
import {MyGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "../users/entities/user.entity";
import {UsersService} from "../users/users.service";
import {Reports} from "../reports/reports.entity";
import {ReportsService} from "../reports/reports.service";
import {CoinHistory} from "../coin-history/coin-history.entity";
import {CoinHistoryService} from "../coin-history/coin-history.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users, Reports, CoinHistory])],
  controllers: [],
  providers: [MyGateway, ChatService, UsersService, ReportsService, CoinHistoryService],
})
export class GatewayModule {}
