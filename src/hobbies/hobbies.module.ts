import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Hobbies} from "./hobbies.entity";
import {HobbyService} from "./hobbies.service";
import {HobbyController} from "./hobbies.controller";
import {UserHobby} from "../user-hobbies/user-hobbies.entity";
import {UserHobbyService} from "../user-hobbies/user-hobbies.service";
import {Users} from "../users/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Hobbies, UserHobby, Users])],
  providers: [HobbyService, UserHobbyService],
  exports: [HobbyService, UserHobbyService],
  controllers: [HobbyController],
})
export class HobbyModule {}
