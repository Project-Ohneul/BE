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
  async loginNaverCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authsService.OAuthLogin({ req, res });
    console.log("req.user: ", req.user);
    console.log("user: ", user);
    res.setHeader("Authorization", "Bearer " + req.user.refreshToken);
    if (user.report < 15) {
      if (req.user.provider === "naver") {
        res.cookie("user_id", user.user_id);
        res.cookie("refreshToken", req.user.refreshToken);
        res.cookie("provider", req.user.provider);
        if (user.admin === true) {
          res.cookie("admin", true);
        }
        res.redirect(process.env.NAVER_LOGIN_REDIRECT);
      } else if (req.user.provider === "kakao") {
        res.cookie("user_id", user.user_id);
        res.cookie("refreshToken", req.user.refreshToken);
        res.cookie("provider", req.user.provider);
        if (user.admin === true) {
          res.cookie("admin", true);
        }
        res.redirect(process.env.KAKAO_LOGIN_REDIRECT);
      }
    } else if (user.report >= 15) {
      throw new Error("신고 횟수 누적으로 차단되었습니다.");
    }
  }

  @Get("/login/kakao")
  @UseGuards(AuthGuard("kakao"))
  async loginKakao() {}

  @Get("/login/kakao/callback")
  @UseGuards(AuthGuard("kakao"))
  async loginKakaoCallback(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response
  ) {
    const user = await this.authsService.OAuthLogin({ req, res });
    res.setHeader("Authorization", "Bearer " + req.user.refreshToken);
    if (user.report < 15) {
      if (req.user.provider === "naver") {
        res.cookie("user_id", user.user_id);
        res.cookie("refreshToken", req.user.refreshToken);
        res.cookie("provider", req.user.provider);
        if (user.admin === true) {
          res.cookie("admin", true);
        }
        res.redirect(process.env.NAVER_LOGIN_REDIRECT);
      } else if (req.user.provider === "kakao") {
        res.cookie("user_id", user.user_id);
        res.cookie("refreshToken", req.user.refreshToken);
        res.cookie("provider", req.user.provider);
        if (user.admin === true) {
          res.cookie("admin", true);
        }
        res.redirect(process.env.KAKAO_LOGIN_REDIRECT);
      }
    } else if (user.report >= 15) {
      throw new Error("신고 횟수 누적으로 차단되었습니다.");
    }
  }

  @Post("/logout/naver")
  async logoutNaver(@Res({ passthrough: true }) res: Response) {
    await this.authsService.logout(res);
  }

  @Post("logout/kakao")
  async logoutKakao(@Res({ passthrough: true }) res: Response) {
    await this.authsService.logout(res);
  }
}
