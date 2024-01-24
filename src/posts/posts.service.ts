import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
// import { CreatePostDto } from './dto/create-post.dto'
// import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  // create(createPostDto: CreatePostDto) {
  //   return 'This action adds a new post'
  // }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find()
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} post`
  // }
  // update(id: number, updatePostDto: UpdatePostDto) {
  //   return `This action updates a #${id} post`
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} post`
  // }
}
