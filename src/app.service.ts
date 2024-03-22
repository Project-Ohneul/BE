import {Injectable} from "@nestjs/common";
import * as path from "path";
import * as fs from "fs";

@Injectable()
export class AppService {
  getHello(): string {
    return "HI EVERYONE!";
  }
}
