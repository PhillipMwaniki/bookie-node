import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { DbTable } from '../../constants/DbTable';
import { Author } from './Author';

@Entity({ name: DbTable.BOOKS })
export class Book {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    authorId: number;

    @ManyToOne((type) => Author, (author) => author.books, { eager: true })
    author: Author;

    @Column({ nullable: false })
    title: string;

    @Column({ nullable: false })
    description: string;

    @Column()
    price: number;

    @Column({ nullable: false })
    category: string;

    @Column({ nullable: true })
    image: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
