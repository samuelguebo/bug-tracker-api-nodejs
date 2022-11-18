import { Entity, PrimaryGeneratedColumn } from "typeorm";

export default class BaseEntity {
    @PrimaryGeneratedColumn()
    id: number
}