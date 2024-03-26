import {Module} from "@nestjs/common";
import {AppController} from "./app.controller";
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import * as ormconfig from "../ormconfig";
import {AppService} from "./app.service";
import {GatewayModule} from "./chat/chat.module";
import {UserModule} from "./users/user.module";
import {HobbyModule} from "./hobbies/hobbies.module";
import {MoodModule} from "./moods/moods.module";
import {ThemeModule} from "./themes/themes.module";
import {UserHobbyModule} from "./user-hobbies/user-hobbies.module";
import {PaymentModule} from "./payments/payments.module";
import {OrderController} from "./orders/orders.controller";
import {OrderModule} from "./orders/orders.module";

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
    PaymentModule,
    OrderModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
