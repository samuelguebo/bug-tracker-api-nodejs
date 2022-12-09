import {
  Column, Entity, JoinTable, ManyToMany, ManyToOne,
  OneToMany
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

  @Column({ nullable: true })
  startDate: Date

  @Column({ nullable: true })
  endDate: Date

  @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  author: User

  @ManyToMany(() => User, user => user.tasks)
  @JoinTable()
  collaborators: User[]

  @Column({ default: 'low' })
  priority: Priority

  @ManyToMany(() => Project, project => project.tasks, { onDelete: 'CASCADE' })
  @JoinTable()
  projects: Project[]

  @OneToMany(() => Comment, comment => comment.task)
  comments: Comment[]
}