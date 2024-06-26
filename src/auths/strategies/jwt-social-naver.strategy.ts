import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-naver";
import * as dotenv from "dotenv";
import { Request } from "express";
import axios from "axios";

dotenv.config();

export class JwtNaverStrategy extends PassportStrategy(Strategy, "naver") {
  constructor() {
    super({
      clientID: process.env.NAVER_ID,
      clientSecret: process.env.NAVER_SECRET,
      callbackURL: process.env.NAVER_CALLBACK_URL,
      passReqToCallback: true,
    });
  }
  async validate(
    request: Request,
    accessToken: string,
    refreshToken: string,
    profile
  ) {
    console.log("profile: ", profile);
    // const result = await axios("https://openapi.naver.com/v1/nid/me", {
    //   headers: {
    //     Authorization: `Bearer ${accessToken}`,
    //   },
    // });
    // const { id, gender, name, birthday, birthyear } = result.data.response;
    // console.log("서버로 정보 받아오기 성공!!", result.data.response);
    return {
      provider: "naver",
      provider_id: profile.id,
      accessToken,
      refreshToken,
    };
  }
}
