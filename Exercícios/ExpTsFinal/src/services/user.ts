// services/user.ts

import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../types/user';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({ include: { major: true } });
};

export const createUser = async (newUser: CreateUserDto): Promise<User> => {
  const saltRounds = parseInt(process.env.ROUNDS_BCRYPT || '10', 10);
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(newUser.password, salt);

  return prisma.user.create({
    data: {
      fullname: newUser.fullname,
      email: newUser.email,
      password: hashedPassword,
      majorId: newUser.majorId
    }
  });
};

export const getUser = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id }, include: { major: true } });
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<User> => {
    return prisma.user.update({ where: { id }, data: user });
};

export const removeUser = async (id: string): Promise<User> => {
  const sessions = await prisma.gameSession.findMany({ where: { userId: id } });

  if (sessions.length > 0) {
    throw new Error('Não é possível remover um usuário com pontuações registradas.');
  }

  return prisma.user.delete({ where: { id } });
};



export const checkCredentials = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;

  const match = await bcrypt.compare(password, user.password);
  return match ? user : null;
};
