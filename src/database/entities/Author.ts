import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { DbTable } from '../../constants/DbTable';
import { Book } from './Book';

@Entity({ name: DbTable.AUTHORS })
export class Author {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: true })
    bio: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @OneToMany((type) => Book, (book) => book.author)
    books: Book[];
}
