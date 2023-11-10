import { faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { UserEntity } from '../../entities/user.entity';
import { ProfileEntity } from '../../../../modules/profiles/entities/profile.entity';

export default class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const usersRepository = dataSource.getRepository(UserEntity);
    const profileRepository = dataSource.getRepository(ProfileEntity);
    const user = new UserEntity();
    user.id = 1;
    user.username = 'admin';
    user.tel = '+85620########'
    user.gmail = 'admin@gmail.com';
    user.password = await hash('11111111', 10);
    const user1 = new UserEntity();
    user1.id = 2;
    user1.username = 'user';
    user1.gmail = 'user@gmail.com';
    user1.tel = '+85620########';
    user1.password = await hash('111111', 10);
    const newUser = await usersRepository.save([user, user1]);

    const profile = new ProfileEntity();
    profile.id = 1;
    profile.user_id = newUser[0].id;
    profile.gender = 'male';
    profile.profile_image = 'user-default.jpg';
    profile.dob = null;
    profile.first_name = 'Admin-demo';
    profile.last_name = 'NestJs';
    await profileRepository.save(profile);

    const profile1 = new ProfileEntity();
    profile1.id = 2;
    profile1.user_id = newUser[1].id;
    profile1.gender = 'male';
    profile1.profile_image = 'user1-default.jpg';
    profile1.dob = null;
    profile1.first_name = 'user-demo';
    profile1.last_name = 'NestJs';
    await profileRepository.save(profile1);


    const userFactory = factoryManager.get(UserEntity);
    const profileFactory = factoryManager.get(ProfileEntity);

    const count = await profileRepository.manager.count(ProfileEntity);

    if (count < 10) {
      const profiles = await profileFactory.saveMany(10);
      const newProfiles = await profileRepository.save(profiles);

      const users = await Promise.all(
        newProfiles.map(async (profile) => {
          return await userFactory.make({
            username: faker.internet.userName(),
            gmail: faker.internet.email()
          });
        }),
      );

      await usersRepository.save(users);
    }

    const userCount = await usersRepository.count();

    if (userCount < 20) {
      const customers = await userFactory.saveMany(10);

      await usersRepository.save(customers);
    }
  }
}
