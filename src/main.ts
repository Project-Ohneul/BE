import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
// import {createServer} from "https";
import {ValidationPipe} from "@nestjs/common";
// import * as fs from "fs";
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from "express";
import * as path from "path";

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./tls/ohneul-chat.com.key"),
  //   cert: fs.readFileSync("./tls/ohneul-chat.crt"),
  //   ca: fs.readFileSync("./tls/ohneulCA.pem"),
  // };

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // 정적 파일 제공을 위한 경로 설정
  app.use(express.static(path.join(__dirname, "..", "..", "public")));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  const server = createServer(httpsOptions, app.getHttpAdapter().getInstance());
  await app.init();
  server.listen(4000, () => {
    console.log("포트 4000번에서 귀를 기울이고 있당");
  });
}
bootstrap();
