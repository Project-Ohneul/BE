import {Module} from "@nestjs/common";
import {UserHobbyController} from "./user-hobby.controller";
import {UserHobbyService} from "./user-hobby.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserHobby} from "./user-hobby.entity";
import {UserModule} from "../user/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserHobby]), UserModule],
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
  exports: [UserHobbyService],
})
export class UserHobbyModule {}
