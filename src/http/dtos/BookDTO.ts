import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsUnique } from "../validators/IsUniqueValidator";
import { Author } from "../../database/entities/Author";

export class CreateBookDTO {

    id?: number;

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title: string;

    @IsNotEmpty()
    @IsNumber()
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
    @IsString()
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
    @IsNotEmpty()
    image: string;
}
