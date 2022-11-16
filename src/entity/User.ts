import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm"

@Unique(["email"])
@Entity()
export default class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ nullable: false })
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  password: string
}
