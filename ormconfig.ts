import {TypeOrmModuleOptions} from "@nestjs/typeorm";
import * as dotenv from "dotenv";

dotenv.config();
console.log("env 파일 확인", process.env.USERNAME, process.env.PASSWORD, process.env.DATABASE);
const ormconfig: TypeOrmModuleOptions = {
  type: "mariadb",
  host: "svc.sel5.cloudtype.app",
  port: 30500,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  entities: [],
  synchronize: false,
  autoLoadEntities: true,
  charset: "utf8mb4",
  logging: true,
  keepConnectionAlive: true,
};

export = ormconfig;
