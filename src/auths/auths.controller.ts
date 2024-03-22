import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

interface User {
  user: {
    username: string;
    phone: string;
    birth: string;
    gender: string;
    accessToken: string;
    refreshToken: string;
  };
}

@Controller("login")
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Get("/naver")
  @UseGuards(AuthGuard("naver"))
  async loginNaver() {}

  @Get("/naver/callback")
  @UseGuards(AuthGuard("naver"))
  async loginNaverCallback(@Req() req: Request & User, @Res() res: Response) {
    this.authsService.OAuthLogin({ req, res });
  }
}
