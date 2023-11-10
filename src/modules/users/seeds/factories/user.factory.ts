import { Faker } from '@faker-js/faker';
import { hash } from 'bcrypt';
import { setSeederFactory } from 'typeorm-extension';
import { UserEntity } from '../../entities/user.entity';

export const UsersFactory = setSeederFactory(
  UserEntity,
  async (faker: Faker) => {
    const password = faker.internet.password(8);

    const user = new UserEntity();
    user.password = await hash(password, 10);
    user.tel = faker.phone.number('+85620########');
    return user;
  },
);
