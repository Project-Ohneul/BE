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
    res.cookie("user_id", user.user_id);
    res.cookie("refreshToken", req.user.refreshToken);
    res.redirect("http://localhost:3000/login/naver/callback");
  }
}
