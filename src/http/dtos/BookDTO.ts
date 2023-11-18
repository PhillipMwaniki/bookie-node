import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { Author } from "../../database/entities/Author";
import { Book } from "../../database/entities/Book";
import { IsUnique } from "../validators/IsUniqueValidator";
import { ItExists } from "../validators/ItExistsValidator";

export class CreateBookDTO {

    id?: number;

    @IsNotEmpty()
    @IsString()
    @IsUnique(Book, "title")
    @MinLength(3)
    @MaxLength(30)
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @ItExists(Author, "id")
    authorId: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsNotEmpty()
    image: string;
}

export class UpdateBookDTO {

    id?: number;

    @IsNotEmpty()
    @IsNumber()
    authorId: number;

    @IsNotEmpty()
    @IsString()
    @IsUnique(Book, "title")
    @MinLength(3)
    @MaxLength(30)
    title: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(200)
    description: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsString()
    @IsOptional()
    image: string;
}
