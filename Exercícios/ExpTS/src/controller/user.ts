//controller/user.ts

import { Request, Response } from 'express';
import { userSchema } from '../validators/user';
import * as userService from '../services/user';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const index = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.render('user/index', { users });
};



const create = async (req: Request, res: Response) => {
    const majors = await prisma.major.findMany();

    if (req.method === 'GET') {
        res.render('user/create', { majors });
    } else {
        const { fullname, email, majorId } = req.body;

        const { error } = userSchema.validate({ fullname, email, majorId });

        if (error) return res.status(400).send(error.details[0].message);

        await userService.createUser({ fullname, email, majorId });
        res.redirect('/user');
    }
};




const read = async (req: Request, res: Response) => {
    const { id } = req.params;
    const user = await userService.getUser(id);
    res.render('user/read', { user });
};



const update = async (req: Request, res: Response) => {
    const { id } = req.params;
    //
    const majors = (await prisma.major.findMany()) as Array<
        { name: string; id: string; createdAt: Date; updatedAt: Date; code: string; description: string | null; isSelected?: boolean }
    >;

    if (req.method === 'GET') {
        const user = await userService.getUser(id);

        if (!user) {
            return res.status(404).send('Usuário não encontrado');
        }

        // define qual curso está selecionado para o usuário
        majors.forEach((major) => {
            major.isSelected = major.id === user.majorId;
        });

        res.render('user/update', { user, majors });
    } else {
        const { fullname, email, majorId } = req.body;

        const { error } = userSchema.validate({ fullname, email, majorId });

        if (error) return res.status(400).send(error.details[0].message);

        await userService.updateUser(id, { fullname, email, majorId });
        res.redirect('/user');
    }
};



const remove = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await userService.removeUser(id);
        res.redirect('/user');
    } catch (error) {
        console.error('Erro ao remover usuário:', error);
        res.status(500).send('Erro ao remover usuário');
    }
};


export default { index, create, read, update, remove };
