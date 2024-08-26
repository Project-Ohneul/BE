import { Controller, Get, Res } from "@nestjs/common";
import { AppService } from "./app.service";
import { Response } from "express";
import { join } from "path";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get("*")
  renderApp(@Res() res: Response) {
    res.sendFile(join(__dirname, "..", "public", "index.html"));
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
