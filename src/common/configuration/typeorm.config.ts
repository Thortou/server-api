import { ConfigService } from "@nestjs/config";
import { InterfaceEnv } from "../interfaces/env.interface";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm";
import { models } from "src/infrastructure/repositories/model";

 
export enum DatabaseConnection {
    Main = 'main-connection',
}

export const typeOrmOption = (): TypeOrmModuleAsyncOptions => ({
    name: DatabaseConnection.Main,
    useFactory: (config: ConfigService<InterfaceEnv>) => ({
        type: 'postgres',
        host: config.get('DB_HOST'),
        database: config.get('DB_NAME'),
        port: config.get('DB_PORT', 5432),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        entities: models,
        synchronize:true,
    }),
    inject: [ConfigService],
});
