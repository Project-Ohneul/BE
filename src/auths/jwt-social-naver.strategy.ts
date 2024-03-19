import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import * as dotenv from "dotenv";

dotenv.config();

export class jwtNaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor() {
    super({
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.CALLBACK_URL,
    });
  }
  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log("accessToken: ", accessToken);
    console.log("refreshToken: ", refreshToken);
    console.log("profile: ", profile);

    return {
      name: profile.displayname,
      email: profile._json.email,
      passward: profile.id,
    };
  }
}
