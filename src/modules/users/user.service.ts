import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./entities/user.entity";
import { DataSource, Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { ChangePasswordUser, CreateUserDto, SearchDataUser, UpdateUserDto } from "./dtos/user.dto";
import * as bcript from 'bcrypt'
import { CreateSuccess, NotException, NotFound } from "src/common/exception/filter.exception";
import { DatabaseConnection } from "src/common/configuration/typeorm.config";

@Injectable()
export class UserService {
    constructor(
        @InjectDataSource(DatabaseConnection.Main)
        private dataSource: DataSource
    ) { }

    //Function 1
    //insert into data in database
    async create(create: CreateUserDto): Promise<any> {
        const user = new UserEntity()
        user.username = create.username;
        user.password = await bcript.hash(create.password, 10);
        user.gmail = create.gmail;
        user.tel = create.tel;

        if (create.password !== create.comfirm_pass) throw new NotException('comfirm_pass wrong...')
        const result = await this.dataSource
            .getRepository(UserEntity)
            .save(user)
        // if (result) throw new CreateSuccess('created....')
        return result
    }

    //Function 2
    //getAll data in database..
    async findAll(query: SearchDataUser): Promise<any> {
        const { search } = query;
        const result = this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.profile', 'profile')

        if (search) {
            result.andWhere('(LOWER(users.username) LIKE(:search)) or (LOWER(profile.first_name) LIKE(:search))', {
                search: `%${search}%`
            })
        }
        const output = await result.getMany()
        return {
            count: output.length,
            data: output
        }

    }

    //Function 3
    //getOne data in database
    async findOne(id: number): Promise<any> {
        const result = await this.dataSource
            .getRepository(UserEntity)
            .createQueryBuilder('users')
            .leftJoinAndSelect('users.profile', 'profile')
            .andWhere('users.id = :id', { id })
            .getOne();

        if (!result) throw new NotFound(`not found your id ${id}`)
        return result
    }

    //Function 4
    //update data in database
    async update(id: number, updateUser: UpdateUserDto): Promise<any> {
        const user = await this.findOne(id)
        if (!user) throw new NotFound('not found data you want to update....')
        const result = await this.dataSource.getRepository(UserEntity).update(user.id, updateUser)
        if (result) throw new CreateSuccess('updated...')
        return 'error!!!'
    }

    //Function 5
    //delete data in database
    async removed(id: number): Promise<string> {
        const user = await this.findOne(id);
        if (!user) throw new NotFound('not found data you want to delete...')
        const result = await this.dataSource.getRepository(UserEntity).delete(user.id)
        if (result) throw new CreateSuccess('deleted....')
        return 'delete error!!!'
    }

    //change password
    async changePass(changePassUser: ChangePasswordUser, id: number): Promise<any> {
        const user = await this.findOne(id)
        const dataUser = new UserEntity()
        dataUser.password = await bcript.hash(changePassUser.new_password, 10);
        if (!user) throw new NotFound('not found user')
        const checkPass = await bcript.compare(changePassUser.old_password, user.password)
        if (!checkPass) throw new NotException('your old password invalid....')

        if (changePassUser.new_password !== changePassUser.comfirm_pass) throw new NotException('comfirm password')
        const result = await this.dataSource.getRepository('users').update(user.id,dataUser)
        if (result) throw new CreateSuccess('change password success....')
        return 'error!!!!'
    }

}