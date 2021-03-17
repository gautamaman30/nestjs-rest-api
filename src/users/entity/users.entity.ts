import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        unique: true
    })
    username: string;

    @Column({
        length: 100
    })
    first_name: string;

    @Column({
        length: 100
    })
    last_name: string;

    @Column({
        length: 200
    })
    password: string;

    @Column({
        length: 200,
        nullable: true
    })
    title: string;
}