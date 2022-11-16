import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm"
import Comment from "./Comment"
import Project from "./Project"
import User from "./User"

type Priority = 'low' | 'medium' | 'high'

@Entity()
export default class Task {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ type: 'varchar', default: '' })
  title: string

  @Column("text")
  content: string

  @ManyToOne(() => User, (user) => user)
  author: User

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  subscribers: User[]

  @Column({
    type: 'enum',
    enum: ['low', 'medium', 'high'],
    default: 'low',
  })
  priority: Priority

  @ManyToMany(() => Project)
  @JoinTable()
  projects: Project[]
}