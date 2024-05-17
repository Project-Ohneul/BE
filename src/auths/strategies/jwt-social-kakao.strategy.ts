import { PassportStrategy } from "@nestjs/passport";
import * as dotenv from "dotenv";
import { Strategy } from "passport-kakao";

dotenv.config();

export class JwtKakaoStrategy extends PassportStrategy(Strategy, "kakao") {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
      scope: [],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any) {
    console.log("accessToken", accessToken);
    console.log("refreshToken", refreshToken);
    console.log("profile", profile);

    return {
      provider: profile.provider,
      provider_id: profile.id,
      accessToken,
      refreshToken,
    };
  }
}
