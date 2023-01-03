import { Column, CreateDateColumn, Entity, ManyToOne, UpdateDateColumn } from "typeorm"
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

    @ManyToOne(() => Task, task => task.comments, { nullable: false, onDelete: 'CASCADE', eager: true })
    task: Task

    @UpdateDateColumn()
    updatedAt: Date
}