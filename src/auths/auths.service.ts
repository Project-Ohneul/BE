import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UsersService } from "src/users/users.service";

@Injectable()
export class AuthsService {
  constructor(private readonly usersService: UsersService) {}

  async OAuthLogin({ req, res }) {
    console.log(req.user.password);
    let user = await this.usersService.findUserToProviderId(req.user.passward);

    if (!user) {
      await this.usersService.createBySocialLogin(req.user);
      user = await this.usersService.findUserToProviderId(req.user.passward);
    }

    // this.setRefreshtoken({ user, res });
    res.redirect("");
  }
}
