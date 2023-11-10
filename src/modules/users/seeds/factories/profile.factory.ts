import { Faker } from '@faker-js/faker';
import { ProfileEntity } from '../../../../modules/profiles/entities/profile.entity';
import { setSeederFactory } from 'typeorm-extension';

export const ProfilesFactory = setSeederFactory(
  ProfileEntity,
  async (faker: Faker) => {
    const profile = new ProfileEntity();
    profile.first_name = faker.person.firstName();
    profile.last_name = faker.person.lastName();
    return profile;
  },
);
