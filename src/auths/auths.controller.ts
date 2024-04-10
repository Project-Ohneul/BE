import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { AuthGuard } from "@nestjs/passport";
import { Request, Response } from "express";
import { VisitHistoryService } from "src/visit-history/visit-history.service";

// interface User {
//   user: {
//     username: string;
//     birth: string;
//     gender: string;
//     accessToken: string;
//     refreshToken: string;
//   };
// }

@Controller()
export class AuthsController {
  constructor(
    private readonly authsService: AuthsService,
    private visitHistoryService: VisitHistoryService
  ) {}

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
  @UseGuards(AuthGuard("naver"))
  async logoutNaver(@Req() req: Request, @Res() res: Response) {
    this.authsService.logout(req, res);
  }

  @Post("logout/kakao")
  @UseGuards(AuthGuard("kakao"))
  async logoutKakao(@Req() req: Request, @Res() res: Response) {
    this.authsService.logout(req, res);
  }
}
