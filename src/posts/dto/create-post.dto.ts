import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNotEmpty, IsString } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((data) => data.value.trim().toUpperCase())
  title: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((data) => data.value.trim().toUpperCase())
  author: string

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Transform((data) => data.value.trim().toUpperCase())
  content: string
}
