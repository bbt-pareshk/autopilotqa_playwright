import * as dotenv from 'dotenv';
dotenv.config();

export const ENV = {
  BASE_URL: process.env.BASE_URL!,
  USERS: {
    ADMIN: {
      username: process.env.ADMIN_USERNAME!,
      password: process.env.ADMIN_PASSWORD!
    },
    USER: {
      username: process.env.USER_USERNAME!,
      password: process.env.USER_PASSWORD!
    },
    SUPPORT: {
      username: process.env.SUPPORT_USERNAME!,
      password: process.env.SUPPORT_PASSWORD!
    }
  }
};
