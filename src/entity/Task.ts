import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import Project from "./Project";
import User from "./User";

type Priority = 'low' | 'medium' | 'high';

@Entity()
export default class Task {
    @PrimaryGeneratedColumn('uuid')
    id: number

    @Column({type: 'varchar', default: ''})
    title: string

    @Column("text")
    content: string

    @OneToOne(()=> User)
    @JoinColumn()
    author: User

    @ManyToMany(() => User)
    @JoinTable()
    members: User[]

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high'],
        default: 'low',
      })
      priority: Priority;

    @ManyToMany(() => Project)
    @JoinTable()
    projects: Project[]
}