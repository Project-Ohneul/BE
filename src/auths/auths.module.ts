import { Module } from "@nestjs/common";
import { AuthsController } from "./auths.controller";
import { AuthsService } from "./auths.service";
import { Users } from "src/users/entities/user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersService } from "src/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtNaverStrategy } from "./strategies/jwt-social-naver.strategy";
import { JwtKakaoStrategy } from "./strategies/jwt-social-kakao.strategy";
import { HttpModule } from "@nestjs/axios";
import { VisitHistory } from "src/visit-history/visit-history.entity";
import { VisitHistoryService } from "src/visit-history/visit-history.service";

@Module({
  imports: [
    JwtModule.register({}),
    TypeOrmModule.forFeature([Users]),
    TypeOrmModule.forFeature([VisitHistory]),
    HttpModule,
  ],
  controllers: [AuthsController],
  providers: [
    VisitHistoryService,
    AuthsService,
    UsersService,
    JwtNaverStrategy,
    JwtKakaoStrategy,
  ],
})
export class AuthsModule {}
