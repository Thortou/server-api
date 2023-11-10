import { Injectable } from "@nestjs/common";
import { InjectDataSource } from "@nestjs/typeorm";
import { DatabaseConnection } from "src/common/configuration/typeorm.config";
import { DataSource } from "typeorm";
import { CreateProfileDto } from "./dtos/profile.dto";
import { ProfileEntity } from "./entities/profile.entity";
import { CreateSuccess } from "src/common/exception/filter.exception";
import { UserEntity } from "../users/entities/user.entity";

@Injectable()
export class ProfileService {
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private _dataSource: DataSource
    ){}

    //Function 1
    async create(createProfile: CreateProfileDto, user: UserEntity): Promise<any> {

        const profile = new ProfileEntity()
        profile.first_name = createProfile.first_name;
        profile.last_name = createProfile.last_name;
        profile.dob = createProfile.dob;
        profile.profile_image = createProfile.profile_image;
        profile.gender = createProfile.gender;
        profile.user_id = user.id;
        const result = await this._dataSource.getRepository(ProfileEntity).save(profile)
        
        if(result) throw new CreateSuccess('inserted.....')
        return 'insert error!!!!'
    }

}