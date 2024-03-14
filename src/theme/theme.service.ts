import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Themes} from "./theme.entity";

@Injectable()
export class ThemeService {
  constructor(
    @InjectRepository(Themes)
    private readonly themeRepository: Repository<Themes>
  ) {}

  async createTheme({theme}) {
    return await this.themeRepository.save({
      theme,
    });
  }
}
