import {Module} from "@nestjs/common";
import {UserHobbyController} from "./user-hobbies.controller";
import {UserHobbyService} from "./user-hobbies.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserHobby} from "./user-hobbies.entity";
import {UsersModule} from "../users/users.module";
import {Users} from "../users/entities/user.entity";
import {Hobbies} from "../hobbies/hobbies.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserHobby, Users, Hobbies]), UsersModule],
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
  exports: [UserHobbyService],
})
export class UserHobbyModule {}
