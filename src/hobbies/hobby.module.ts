import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hobbies} from "./hobby.entity";
import {HobbyService} from "./hobby.service";
import {HobbyController} from "./hobby.controller";
import {UserHobby} from "src/user-hobby/user-hobby.entity";
import {UserHobbyService} from "src/user-hobby/user-hobby.service";
import {User} from "src/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Hobbies, UserHobby, User])],
  providers: [HobbyService, UserHobbyService],
  exports: [HobbyService, UserHobbyService],
  controllers: [HobbyController],
})
export class HobbyModule {}
