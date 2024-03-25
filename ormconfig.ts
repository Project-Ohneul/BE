import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { Users } from "src/users/entities/user.entity";

dotenv.config();
const ormconfig: TypeOrmModuleOptions = {
  type: "mariadb",
  host: "svc.sel5.cloudtype.app",
  port: 30276,
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
//10.124.3.210
export = ormconfig;
