import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";

// interface User {
//   user: {
//     username: string;
//     birth: string;
//     gender: string;
//     accessToken: string;
//     refreshToken: string;
//   };
// }

@Controller("api")
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Get("/login/naver")
  @UseGuards(AuthGuard("naver"))
  async loginNaver() {}

  @Get("/login/naver/callback")
  @UseGuards(AuthGuard("naver"))
  async loginNaverCallback(@Req() req: Request, @Res() res: Response) {
    this.authsService.OAuthLogin({ req, res });
  }

  @Get("/login/kakao")
  @UseGuards(AuthGuard("kakao"))
  async loginKakao() {}

  @Get("/login/kakao/callback")
  @UseGuards(AuthGuard("kakao"))
  async loginKakaoCallback(@Req() req: Request, @Res() res: Response) {
    this.authsService.OAuthLogin({ req, res });
  }

  @Post("/logout/naver")
  async logoutNaver(@Res() res: Response) {
    this.authsService.logout(res);
  }

  @Post("logout/kakao")
  async logoutKakao(@Res() res: Response) {
    this.authsService.logout(res);
  }
}
