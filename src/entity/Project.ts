import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./User"

@Entity()
export default class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar', nullable: false, length: 80 })
  title: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @ManyToMany(() => User, { cascade: true })
  @JoinTable()
  members: User[]
}