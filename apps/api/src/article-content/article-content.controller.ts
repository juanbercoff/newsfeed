import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ArticleContentService } from './article-content.service';

@Controller('article-content')
export class ArticleContentController {
  constructor(private readonly articleContentService: ArticleContentService) {}
}
