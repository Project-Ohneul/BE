import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as ormconfig from "../ormconfig";
import {AppService} from "./app.service";
import {GatewayModule} from "./chat/chat.module";
import {UserModule} from "./user/user.module";
import {HobbyModule} from "./hobbies/hobby.module";
import {MoodModule} from "./mood/mood.module";
import {ThemeModule} from "./theme/theme.module";
import {UserHobbyModule} from "./user-hobby/user-hobby.module";

@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    GatewayModule,
    UserModule,
    HobbyModule,
    MoodModule,
    ThemeModule,
    UserHobbyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
