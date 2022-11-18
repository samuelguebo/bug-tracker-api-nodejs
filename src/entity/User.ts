import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import BaseEntity from "./BaseEntity"
import Comment from "./Comment"
import Task from "./Task"

@Entity()
export default class User extends BaseEntity {

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ select: false })
  password: string

  @OneToMany(() => Task, task => task.author)
  tasks: Task[]

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[]

}
