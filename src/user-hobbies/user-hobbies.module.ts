import { Module } from "@nestjs/common";
import { UserHobbyController } from "./user-hobbies.controller";
import { UserHobbyService } from "./user-hobbies.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserHobby } from "./user-hobbies.entity";
import { UsersModule } from "../users/users.module";
import { Users } from "src/users/entities/user.entity";
import { Hobbies } from "src/hobbies/hobbies.entity";

@Module({
  imports: [TypeOrmModule.forFeature([UserHobby, Users, Hobbies]), UsersModule],
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
  exports: [UserHobbyService],
})
export class UserHobbyModule {}
