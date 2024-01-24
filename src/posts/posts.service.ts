import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Post } from './entities/post.entity'
import { Repository } from 'typeorm'
import { CreatePostDto } from './dto/create-post.dto'
import { UpdatePostDto } from './dto/update-post.dto'

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.save(createPostDto)
  }

  async findAll(): Promise<Post[]> {
    return await this.postRepository.find()
  }

  async findOne(id: number): Promise<Post> {
    const user = await this.postRepository.findOne({ where: { id } })
    if (!user) throw new HttpException('USER NOT FOUND', HttpStatus.NOT_FOUND)
    return user
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    await this.findOne(id)
    return await this.postRepository.update({ id }, updatePostDto)
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id)
    await this.postRepository.softDelete(id)
  }
}
