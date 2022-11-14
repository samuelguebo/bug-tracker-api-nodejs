import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

@Entity()
export default class Project {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @Column({ type: 'varchar', length: 80 })
  title: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}