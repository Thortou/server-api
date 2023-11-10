import { IsEmail, IsEmpty, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    tel : string;

    @IsEmail()
    gmail: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    password: string;
    comfirm_pass : string;
}

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    tel : string;

    @IsEmail()
    gmail: string;
}

export class SearchDataUser {
    search: string;
}

export class ChangePasswordUser {
    old_password: string;
    new_password: string;
    comfirm_pass : string;

}