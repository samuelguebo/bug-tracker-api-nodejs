import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import BaseEntity from "./BaseEntity"
import Task from "./Task"
import User from "./User"

@Entity()
export default class Comment extends BaseEntity {

    @Column("text")
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, { nullable: false, onDelete: 'CASCADE', eager: true })
    author: User

    @ManyToOne(() => Task, { nullable: false, onDelete: 'CASCADE', eager: true })
    task: Task

    @UpdateDateColumn()
    updatedAt: Date
}