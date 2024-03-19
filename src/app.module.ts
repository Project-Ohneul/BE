import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as ormconfig from "../ormconfig";
import { AppService } from "./app.service";
import { AuthsModule } from "./auths/auths.module";
import { UsersModule } from "./users/users.module";
import { Users } from "./users/entities/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Users]),
    AuthsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
