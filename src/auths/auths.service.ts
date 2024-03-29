import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

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
      domain: "127.0.0.1",
      path: "/",
      sameSite: "none",
      secure: true,
      httpOnly: true,
    };

    if (req.user.provider === "naver") {
      res.cookie("user_id", user.user_id, setting);
      res.cookie("refreshToken", req.user.refreshToken, setting);
      res.cookie("provider", req.user.provider, setting);
      res.redirect("http://localhost:3000/login/naver/callback");
    } else if (req.user.provider === "kakao") {
      res.cookie("user_id", user.user_id, setting);
      res.cookie("refreshToken", req.user.refreshToken, setting);
      res.cookie("provider", req.user.provider, setting);
      res.redirect("http://localhost:3000/login/kakao/callback");
    }
  }
}
