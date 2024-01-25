import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { PostsService } from './posts.service'
import { Post as PostEntity } from './entities/post.entity'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Controller({ path: 'posts', version: '1' })
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.create(createPostDto)
  }

  @Get()
  async findAll(@Query('search') search?: string): Promise<PostEntity[]> {
    return await this.postsService.findAll(search)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return await this.postsService.update(+id, updatePostDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.postsService.remove(+id)
  }
}
