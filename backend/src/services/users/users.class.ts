import { Service, MongooseServiceOptions } from 'feathers-mongoose';
import { Application } from '../../declarations';
import crypto from 'crypto';
import { Params } from '@feathersjs/feathers';

const gravatarUrl = 'https://s.gravatar.com/avatar';

const getGravatar = (email: string) => {
  const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex');

  return `${gravatarUrl}/${hash}`;
}

interface UserData {
  _id?: string;
  email: string;
  password: string;
  username: string;
  avatar?: string;
}

export class Users extends Service<UserData> {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  create(data: UserData, params?: Params) {
    const { email, password, username } = data;

    const avatar = data.avatar || getGravatar(email);

    const UserData = {
      email,
      password,
      username,
      avatar
    };

    return super.create(UserData, params)
  }
}
