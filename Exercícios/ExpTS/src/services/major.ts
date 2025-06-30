import { PrismaClient, Major } from '@prisma/client';
import { CreateMajorDto, UpdateMajorDto } from '../types/major';

const prisma = new PrismaClient();

//retorna todos os cursos
export const getAllMajors = async (): Promise<Major[]> => {
  return prisma.major.findMany();
};

// rria um novo curso
export const createMajor = async (newMajor: CreateMajorDto): Promise<Major> => {
  return await prisma.major.create({
    data: newMajor,
  });
};

// verifica se já existe um curso com o mesmo nome ou código
export const majorAlreadyExists = async (name: string, code: string): Promise<boolean> => {
  const major = await prisma.major.findFirst({
    where: { OR: [{ name }, { code }] },
  });
  return !!major;
};

// retorna um curso pelo ID
export const getMajor = async (id: string): Promise<Major | null> => {
  return prisma.major.findUnique({
    where: { id },
  });
};

//Atualiza um curso pelo ID
export const updateMajor = async (id: string, updatedData: UpdateMajorDto): Promise<Major> => {
  return prisma.major.update({
    where: { id },
    data: updatedData,
  });
};

// Remove um curso pelo ID
export const removeMajor = async (id: string): Promise<Major> => {
  return prisma.major.delete({
    where: { id },
  });
};
