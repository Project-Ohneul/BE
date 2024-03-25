import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Hobbies} from "src/hobbies/hobby.entity";
import {HobbyService} from "src/hobbies/hobby.service";
import {UserHobby} from "src/user-hobby/user-hobby.entity";
import {UserHobbyService} from "src/user-hobby/user-hobby.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Hobbies, UserHobby])],
  providers: [UserService, HobbyService, UserHobbyService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
