import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm"

@Entity()
export default class User {
  @PrimaryColumn()
  email: string

  @Column({ nullable: true })
  firstName: string

  @Column({ nullable: true })
  lastName: string

  @Column()
  password: string
}
