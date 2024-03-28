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
    let gender: string;
    if (profile._json.kakao_account.gender === "male") {
      gender = "M";
    } else if (profile._json.kakao_account.gender === "female") {
      gender = "F";
    }

    let birthday: string =
      profile._json.kakao_account.birthday.slice(0, 2) +
      "-" +
      profile._json.kakao_account.birthday.slice(2);
    console.log(profile._json.birthday);

    return {
      provider: profile.provider,
      provider_id: profile.id,
      username: profile._json.kakao_account.name,
      gender,
      birth: `${profile._json.kakao_account.birthyear}-${birthday}`,
      accessToken,
      refreshToken,
    };
  }
}
