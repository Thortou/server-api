import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { ChangePasswordUser, CreateUserDto, SearchDataUser, UpdateUserDto } from "./dtos/user.dto";
import { UserEntity } from "./entities/user.entity";
import { ProfileService } from "../profiles/profile.service";
import { CreateProfileDto } from "../profiles/dtos/profile.dto";
import { ProfileEntity } from "../profiles/entities/profile.entity";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly profileService: ProfileService,
    ) { }

    @Post()
    async create(
        @Body() createUser: CreateUserDto,
        @Body() createProfileDto: CreateProfileDto
    ): Promise<ProfileEntity> {
        const user = await this.userService.create(createUser)
        const profile = await this.profileService.create(createProfileDto, user)

        return profile
    }

    @Get()
    findAll(
        @Query() search: SearchDataUser
    ): Promise<UserEntity[]> {
        return this.userService.findAll(search)
    }

    @Get(':id')
    findOne(@Param('id') id: number): Promise<UserEntity> {
        return this.userService.findOne(id);
    }

    @Put(':id')
    updated(@Param('id') id: number, @Body() createUser: UpdateUserDto): Promise<UserEntity> {
        return this.userService.update(id, createUser)
    }

    @Delete(':id/delete')
    removed(@Param('id') id: number): Promise<any> {
        return this.userService.removed(id)
    }

    @Put(':id/changePass')
    changePass(
        @Param('id') id: number,
        @Body() changepassUser: ChangePasswordUser
        ): Promise<UserEntity>{
            return this.userService.changePass(changepassUser, id)
        }
}