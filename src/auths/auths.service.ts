import { Injectable } from "@nestjs/common";
import { HttpModule, HttpService } from "@nestjs/axios";
import { UsersService } from "src/users/users.service";
import * as dotenv from "dotenv";
import { VisitHistoryService } from "src/visit-history/visit-history.service";

dotenv.config();

@Injectable()
export class AuthsService {
  accessToken: string;
  private http: HttpService;
  constructor(
    private readonly usersService: UsersService,
    private visitHistoryService: VisitHistoryService
  ) {
    this.accessToken = "";
    this.http = new HttpService();
  }

  async OAuthLogin({ req, res }) {
    console.log("authsService: ", req.user);
    let user = await this.usersService.findUserToProviderId(
      req.user.provider_id
    );

    if (!user) {
      await this.usersService.createBySocialLogin(req.user);
      user = await this.usersService.findUserToProviderId(req.user.provider_id);
      await this.visitHistoryService.postVisitHistory(user.user_id);
    }
    this.accessToken = req.user.accessToken;
    await this.visitHistoryService.updateVisitHistory(user.user_id);
    const setting = {
      // domain: "localhost",
      // sameSite: "none",
      // secure: true,
      // httpOnly: true,
    };

    if (req.user.provider === "naver") {
      res.cookie("user_id", user.user_id, setting);
      res.cookie("refreshToken", req.user.refreshToken, setting);
      res.cookie("provider", req.user.provider, setting);
      res.redirect(process.env.NAVER_LOGIN_REDIRECT);
    } else if (req.user.provider === "kakao") {
      res.cookie("user_id", user.user_id, setting);
      res.cookie("refreshToken", req.user.refreshToken, setting);
      res.cookie("provider", req.user.provider, setting);
      res.redirect(process.env.KAKAO_LOGIN_REDIRECT);
    }
  }

  async logout(req, res): Promise<any> {
    const header = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    res.setHeader("Set-Cookie", header);
    return res.sendStatus(200);
  }
}
