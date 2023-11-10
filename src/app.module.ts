import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmRepositoryModule } from './infrastructure/repositories/typeorm.repository.module';
import { UserModule } from './modules/users/user.module';
import { ProfileModule } from './modules/profiles/profile.module';

@Module({
  imports: [
    TypeOrmRepositoryModule,
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: ['.env']
    }),
    UserModule,
    ProfileModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
