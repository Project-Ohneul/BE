import {Module} from "@nestjs/common";
import {UserHobbyController} from "./user-hobby.controller";
import {UserHobbyService} from "./user-hobby.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserHobby} from "./user-hobby.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserHobby])],
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
  exports: [UserHobbyService],
})
export class UserHobbyModule {}
