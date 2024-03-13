import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
// import {createServer} from "https";
import {ValidationPipe} from "@nestjs/common";
import * as fs from "fs";

async function bootstrap() {
  // const httpsOptions = {
  //   key: fs.readFileSync("./tls/ohneul-chat.com.key"),
  //   cert: fs.readFileSync("./tls/ohneul-chat.crt"),
  //   ca: fs.readFileSync("./tls/ohneulCA.pem"),
  // };

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  // const server = createServer(httpsOptions, app.getHttpAdapter().getInstance());
  // await app.init();
  app.listen(3000, () => {
    console.log("포트 3000번에서 귀를 기울이고 있당");
  });
}
bootstrap();
