import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { userModel } from "../users/entities";
import { DatabaseConnection } from "src/common/configuration/typeorm.config";
import { ProfileService } from "./profile.service";

@Module({
    imports: [TypeOrmModule.forFeature(userModel, DatabaseConnection.Main)],
    controllers: [ ],
    providers: [ProfileService],
    exports: [ProfileService]
})
export class ProfileModule {}