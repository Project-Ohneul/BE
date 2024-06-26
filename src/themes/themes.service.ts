import {Injectable, NotFoundException} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Themes} from "./themes.entity";

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

  async getAllThemes(): Promise<Themes[]> {
    return await this.themeRepository.find();
  }

  // remove로 할까...delete로 할까...
  async deleteOneTheme(theme_id: number): Promise<void> {
    const result = await this.themeRepository.delete(theme_id);

    if (result.affected === 0) {
      throw new NotFoundException(`해당 주제를 찾을 수 없습니다. -> id: ${theme_id}`);
    }
  }

  async updateTheme(theme_id: number, updateTheme: string): Promise<void> {
    const theme = await this.themeRepository.findOne({where: {theme_id}});

    if (!theme) {
      throw new NotFoundException(`해당 주제를 찾을 수 없습니다. -> id: ${theme_id}`);
    }

    theme.theme = updateTheme;

    await this.themeRepository.save(theme);
  }
}
