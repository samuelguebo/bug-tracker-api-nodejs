import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import BaseEntity from "./BaseEntity"
import Task from "./Task"
import User from "./User"

@Entity()
export default class Project extends BaseEntity {

  @Column({ type: 'varchar', nullable: false, length: 80 })
  title: string

  @Column({ type: 'text', nullable: true })
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => User, user => user.projects)
  @JoinTable()
  members: User[]

  @ManyToMany(() => Task, { onDelete: 'CASCADE' })
  @JoinTable()
  tasks: Task[]
}