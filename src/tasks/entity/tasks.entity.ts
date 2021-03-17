import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "../../users/entity/users.entity";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length: 100
    })
    name: string;
    
    @Column({
        length: 200
    })
    content: string;

    @ManyToOne(type => Users)
    @JoinColumn({
        name: "username",
        referencedColumnName: "username"
    })
    users: Users;

    @Column({
        type: "date",
        default: () => "CURRENT_DATE"
    })
    created_on;
}