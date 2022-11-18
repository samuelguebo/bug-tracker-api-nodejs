import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm"
import BaseEntity from "./BaseEntity"
import Comment from "./Comment"
import Project from "./Project"
import User from "./User"

type Priority = 'low' | 'medium' | 'high'

@Entity()
export default class Task extends BaseEntity {

  @Column({ type: 'varchar', nullable: false })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @ManyToOne(() => User, (user) => user, { nullable: false, onDelete: 'CASCADE' })
  author: User

  @ManyToMany(() => User)
  @JoinTable({ name: 'task_subscribers' })
  subscribers: User[]

  @Column({ default: 'low' })
  priority: Priority

  @ManyToMany(() => Project)
  @JoinTable({ name: 'task_projects' })
  projects: Project[]

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[]
}