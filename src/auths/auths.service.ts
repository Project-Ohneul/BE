import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as dotenv from "dotenv";

dotenv.config();

@Injectable()
export class AuthsService {
  constructor(private readonly usersService: UsersService) {}

  async OAuthLogin({ req, res }) {
    console.log("authsService: ", req.user);
    let user = await this.usersService.findUserToProviderId(
      req.user.provider_id
    );

    if (!user) {
      await this.usersService.createBySocialLogin(req.user);
      user = await this.usersService.findUserToProviderId(req.user.provider_id);
    }

    const setting = {
      domain: "port-0-ohneul-front-754g42alucwss46.sel5.cloudtype.app",
      sameSite: "none",
      secure: true,
      httpOnly: true,
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
}
