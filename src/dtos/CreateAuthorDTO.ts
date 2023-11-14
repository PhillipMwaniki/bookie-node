import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateAuthorDTO {

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(30)
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    bio: string;
}
