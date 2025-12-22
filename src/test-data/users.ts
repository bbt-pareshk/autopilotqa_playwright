import { ENV } from '../config/env';
import { UserRole } from '../constants/roles';

export const users = {
  [UserRole.ADMIN]: ENV.USERS.ADMIN,
  [UserRole.USER]: ENV.USERS.USER,
  [UserRole.SUPPORT]: ENV.USERS.SUPPORT
};
