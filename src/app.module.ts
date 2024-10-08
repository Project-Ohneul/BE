import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as ormconfig from "../ormconfig";
import { AuthsModule } from "./auths/auths.module";
import { UsersModule } from "./users/users.module";
import { AppService } from "./app.service";
import { GatewayModule } from "./chat/chat.module";
import { HobbyModule } from "./hobbies/hobbies.module";
import { MoodModule } from "./moods/moods.module";
import { ThemeModule } from "./themes/themes.module";
import { UserHobbyModule } from "./user-hobbies/user-hobbies.module";
import { PaymentModule } from "./payments/payments.module";
import { OrderController } from "./orders/orders.controller";
import { OrderModule } from "./orders/orders.module";
import { ReportsModule } from "./reports/reports.module";
import { CoinHistoryModule } from "./coin-history/coin-history.module";
import { VisitHistoryModule } from "./visit-history/visit-history.module";
import { NoticesModule } from "./notices/notices.module";

@Module({
  imports: [
    GatewayModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    AuthsModule,
    UsersModule,
    GatewayModule,
    HobbyModule,
    MoodModule,
    ThemeModule,
    UserHobbyModule,
    PaymentModule,
    OrderModule,
    ReportsModule,
    CoinHistoryModule,
    VisitHistoryModule,
    NoticesModule,
  ],
  controllers: [AppController, OrderController],
  providers: [AppService],
})
export class AppModule {}
