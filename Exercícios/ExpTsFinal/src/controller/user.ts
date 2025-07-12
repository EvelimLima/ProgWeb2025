//controller/user.ts

import { Request, Response } from 'express';
import { userSchema, userUpdateSchema } from '../validators/user';
import * as userService from '../services/user';
import { PrismaClient } from '@prisma/client';
import { checkCredentials } from '../services/user';
import { Session, SessionData } from 'express-session';
import bcrypt from 'bcrypt';

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
        const { fullname, email, password, repassword, majorId } = req.body;

        const { error } = userSchema.validate({ fullname, email, password, repassword, majorId });

        if (error) return res.status(400).send(error.details[0].message);

        await userService.createUser({ fullname, email, password, majorId });
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

        const { error } = userUpdateSchema.validate({ fullname, email, majorId });

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

const showLoginForm = (_req: Request, res: Response) => {
  res.render('user/login'); // precisa criar esse handlebars
};

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await checkCredentials(email, password);
  if (!user) {
    return res.render('user/login', { error: 'Credenciais inválidas' });
  }

    (req.session as Session & { user: { id: string; name: string; email: string } }).user = {
    id: user.id,
    name: user.fullname,
    email: user.email
    };

  res.cookie('userId', user.id); // opcional
  res.redirect('/game');
};

const logout = (req: Request, res: Response) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send('Erro ao encerrar a sessão');
    }
    res.clearCookie('connect.sid'); // nome do cookie padrão
    res.redirect('/login');
  });
};



const changePasswordForm = (req: Request, res: Response) => {
  res.render('user/changePassword');
};

const changePassword = async (req: Request, res: Response) => {
  const userId = (req.session as Session & { user?: { id: string } }).user?.id;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.render('user/changePassword', { error: 'Todos os campos são obrigatórios.' });
  }

  if (newPassword !== confirmPassword) {
    return res.render('user/changePassword', { error: 'A nova senha e a confirmação não coincidem.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !await bcrypt.compare(currentPassword, user.password)) {
      return res.render('user/changePassword', { error: 'Senha atual incorreta.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    return res.render('user/changePassword', { success: 'Senha alterada com sucesso.' });
  } catch (error) {
    console.error('Erro ao alterar senha:', error);
    res.render('user/changePassword', { error: 'Erro interno.' });
  }
};


export default { index, create, read, update, remove, showLoginForm, login, logout, changePasswordForm, changePassword };
