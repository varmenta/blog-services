import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  author: string

  @Column()
  content: string

  @Column()
  createdAt: string
}
