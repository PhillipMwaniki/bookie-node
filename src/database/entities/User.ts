import { BeforeInsert, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { hash } from "bcryptjs";
import { DbTable } from "../../constants/DbTable";
import { Roles } from "../../constants/Role";

@Entity(DbTable.USERS)
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column({ unique: true })
    email: string;

    @Column({ default: Roles.USER })
    role: number;

    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 12);
    }

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    toResponse(): Partial<User> {
        const responseUser = new User();
        responseUser.id = this.id;
        responseUser.name = this.name;
        responseUser.email = this.email;
        responseUser.role = this.role;
        responseUser.created_at = this.created_at;
        responseUser.updated_at = this.updated_at;

        return responseUser;
    }
}
