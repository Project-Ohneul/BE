import { Controller, Get, Req, Res, UseGuards } from "@nestjs/common";
import { AuthsService } from "./auths.service";
import { AuthGuard } from "@nestjs/passport";

interface User {
  user: {
    username: string;
    phone: string;
    birth: string;
    gender: string;
  };
}

@Controller("login")
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Get("/naver")
  @UseGuards(AuthGuard("naver"))
  async loginNaver(@Req() req: Request & User, @Res() res: Response) {
    console.log("controller: ", req.user);
    this.authsService.OAuthLogin({ req, res });
  }
}
