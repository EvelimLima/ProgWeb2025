//  types/user.ts

import { User } from '@prisma/client';

export type CreateUserDto = Pick<User, 'fullname' | 'email' | 'majorId' | 'password'>;
export type UpdateUserDto = Pick<User, 'fullname' | 'email' | 'majorId'>;
