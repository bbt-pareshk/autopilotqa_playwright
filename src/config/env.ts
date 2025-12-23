import * as dotenv from 'dotenv';
dotenv.config();

type EnvironmentType = 'staging' | 'live';

const CURRENT_ENV = (process.env.ENVIRONMENT as EnvironmentType) || 'live';

const ENV_CONFIG = {
  staging: {
    BASE_URL: process.env.STAGING_BASE_URL!,
    USERS: {
      ADMIN: {
        username: process.env.STAGING_ADMIN_USERNAME!,
        password: process.env.STAGING_ADMIN_PASSWORD!
      },
      USER: {
        username: process.env.STAGING_USER_USERNAME!,
        password: process.env.STAGING_USER_PASSWORD!
      },
      SUPPORT: {
        username: process.env.STAGING_SUPPORT_USERNAME!,
        password: process.env.STAGING_SUPPORT_PASSWORD!
      }
    }
  },

  live: {
    BASE_URL: process.env.LIVE_BASE_URL!,
    USERS: {
      ADMIN: {
        username: process.env.LIVE_ADMIN_USERNAME!,
        password: process.env.LIVE_ADMIN_PASSWORD!
      },
      USER: {
        username: process.env.LIVE_USER_USERNAME!,
        password: process.env.LIVE_USER_PASSWORD!
      },
      SUPPORT: {
        username: process.env.LIVE_SUPPORT_USERNAME!,
        password: process.env.LIVE_SUPPORT_PASSWORD!
      }
    }
  }
};

export const ENV = ENV_CONFIG[CURRENT_ENV];
