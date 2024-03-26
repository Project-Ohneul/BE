import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hobbies} from "./hobbies.entity";
import {HobbyService} from "./hobbies.service";
import {HobbyController} from "./hobbies.controller";
import {UserHobby} from "src/user-hobbies/user-hobbies.entity";
import {UserHobbyService} from "src/user-hobbies/user-hobbies.service";
import {User} from "src/users/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Hobbies, UserHobby, User])],
  providers: [HobbyService, UserHobbyService],
  exports: [HobbyService, UserHobbyService],
  controllers: [HobbyController],
})
export class HobbyModule {}
