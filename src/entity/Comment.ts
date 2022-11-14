import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import User from "./User"

@Entity()
export default class Comment {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column("text")
    content: string

    @CreateDateColumn()
    createdAt: Date

    @ManyToOne(() => User, (user: User) => user)
    author: User

    @UpdateDateColumn()
    updatedAt: Date
}