import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm"
import BaseEntity from "./BaseEntity"
import Comment from "./Comment"
import Project from "./Project"
import Task from "./Task"

@Entity()
export default class User extends BaseEntity {

  @Column({ nullable: false, unique: true })
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column({ default: 'member', })
  role: string

  @Column({ select: false })
  password: string

  @Column({ default: 1 })
  avatar: number

  @ManyToMany(() => Task, task => task.collaborators)
  tasks: Task[]

  @ManyToMany(() => Project, project => project.members)
  projects: Project[]

  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[]

}
