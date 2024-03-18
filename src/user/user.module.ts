import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {UserService} from "./user.service";
import {UserController} from "./user.controller";
import {Hobbies} from "src/hobbies/hobby.entity";
import {HobbyService} from "src/hobbies/hobby.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, Hobbies])],
  providers: [UserService, HobbyService],
  exports: [TypeOrmModule],
  controllers: [UserController],
})
export class UserModule {}
