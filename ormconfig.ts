import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Users } from "src/users/entities/user.entity";

dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: "mariadb",
  host: "localhost",
  port: 3306,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [Users],
  synchronize: false,
  autoLoadEntities: true,
  charset: "utf8mb4",
  logging: true,
  keepConnectionAlive: true,
};

export = ormconfig;
