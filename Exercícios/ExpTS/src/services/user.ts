import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../types/user';

const prisma = new PrismaClient();

export const getAllUsers = async (): Promise<User[]> => {
    return prisma.user.findMany({ include: { major: true } });
};

export const createUser = async (newUser: CreateUserDto): Promise<User> => {
    return prisma.user.create({ data: newUser });
};

export const getUser = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({ where: { id }, include: { major: true } });
};

export const updateUser = async (id: string, user: UpdateUserDto): Promise<User> => {
    return prisma.user.update({ where: { id }, data: user });
};

export const removeUser = async (id: string): Promise<User> => {
    return prisma.user.delete({ where: { id } });
};
