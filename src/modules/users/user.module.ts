import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { DatabaseConnection } from "src/common/configuration/typeorm.config";
import { userModel } from "./entities";
import { ProfileService } from "../profiles/profile.service";

@Module({
    imports:[TypeOrmModule.forFeature(userModel, DatabaseConnection.Main)],
    controllers: [UserController],
    providers: [UserService, ProfileService]
})

export class UserModule {}