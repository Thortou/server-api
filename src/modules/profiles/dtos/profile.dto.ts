import { OmitType } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProfileDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;
    @IsNotEmpty()
    @IsString()
    last_name: string;
    @IsOptional()
    profile_image: string;
    @IsNotEmpty()
    @IsString()
    gender: string;
    dob: Date
    user_id: number;
}

export class SearchDataProfile {
    search: string;
}

export class UpdateProfileDto extends OmitType(CreateProfileDto,[
'profile_image',
'dob',
'user_id'
]){}