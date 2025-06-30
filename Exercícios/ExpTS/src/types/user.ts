import { User } from '@prisma/client';

export type CreateUserDto = Pick<User, 'fullname' | 'email' | 'majorId'>;
export type UpdateUserDto = Pick<User, 'fullname' | 'email' | 'majorId'>;
