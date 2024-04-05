import { Module } from "@nestjs/common";
import { MyGateway } from "./chat.gateway";
import { ChatService } from "./chat.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/users/entities/user.entity";
import { UsersService } from "src/users/users.service";
import { Reports } from "src/reports/reports.entity";
import { ReportsService } from "src/reports/reports.service";

@Module({
  imports: [
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([Reports]),
  ],
  controllers: [],
  providers: [MyGateway, ChatService, UsersService, ReportsService],
})
export class GatewayModule {}
