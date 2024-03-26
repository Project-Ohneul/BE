import {Module} from "@nestjs/common";
import {UserHobbyController} from "./user-hobbies.controller";
import {UserHobbyService} from "./user-hobbies.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserHobby} from "./user-hobbies.entity";
import {UserModule} from "../users/user.module";

@Module({
  imports: [TypeOrmModule.forFeature([UserHobby]), UserModule],
  controllers: [UserHobbyController],
  providers: [UserHobbyService],
  exports: [UserHobbyService],
})
export class UserHobbyModule {}
