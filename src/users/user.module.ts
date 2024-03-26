import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Hobbies} from "src/hobbies/hobbies.entity";
import {HobbyService} from "src/hobbies/hobbies.service";
import {UserHobby} from "src/user-hobbies/user-hobbies.entity";
import {UserHobbyService} from "src/user-hobbies/user-hobbies.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Hobbies, UserHobby])],
  providers: [UserService, HobbyService, UserHobbyService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
