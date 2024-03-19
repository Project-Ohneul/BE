import { Module } from "@nestjs/common";
import { AuthsController } from "./auths.controller";
import { AuthsService } from "./auths.service";
import { Users } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtNaverStrategy } from "./jwt-social-naver.strategy";

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([Users])],
  controllers: [AuthsController],
  providers: [AuthsService, UsersService, jwtNaverStrategy],
})
export class AuthsModule {}
