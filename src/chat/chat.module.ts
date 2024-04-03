import {Module} from "@nestjs/common";
import {MyGateway} from "./chat.gateway";
import {ChatService} from "./chat.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Users} from "src/users/entities/user.entity";
import {UsersService} from "src/users/users.service";

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [],
  providers: [MyGateway, ChatService, UsersService],
})
export class GatewayModule {}
