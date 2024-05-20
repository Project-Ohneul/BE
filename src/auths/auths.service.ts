import { Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import * as dotenv from "dotenv";
import { VisitHistoryService } from "../visit-history/visit-history.service";

dotenv.config();

@Injectable()
export class AuthsService {
  accessToken: string;
  constructor(
    private readonly usersService: UsersService,
    private visitHistoryService: VisitHistoryService
  ) {
    this.accessToken = "";
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

    if (user.deleted_at && user.report < 15) {
      await this.usersService.updateUser(user.user_id, {
        username: null,
        score: 0,
        score_amount: 0,
        coin: 0,
        mood_id: null,
        deleted_at: null,
      });
    } else if (user.deleted_at && user.report >= 15) {
      throw new Error("신고 횟수 누적으로 차단되었습니다.");
    }

    this.accessToken = req.user.accessToken;
    await this.visitHistoryService.updateVisitHistory(user.user_id, res);

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

  async logout(res): Promise<any> {
    const header = `Authentication=; HttpOnly; Path=/; Max-Age=0`;
    res.setHeader("Set-Cookie", header);
    return res.sendStatus(200);
  }
}
