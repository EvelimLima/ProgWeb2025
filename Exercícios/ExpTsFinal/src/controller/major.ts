import { Request, Response } from 'express';
import * as majorService from '../services/major';
import { majorSchema } from '../validators/major';

const index = async (req: Request, res: Response) => {
  const majors = await majorService.getAllMajors();
  res.render('major/index', { majors });
};



const create = async (req: Request, res: Response) => {
  if (req.method === 'GET') {
    return res.render('major/create');
  }

  const { name, code, description } = req.body;
  const { error } = majorSchema.validate({ name, code, description });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const exists = await majorService.majorAlreadyExists(name, code);
  if (exists) {
    return res.status(400).send('Já existe um curso com esse nome ou código.');
  }

  await majorService.createMajor({ name, code, description });
  res.redirect('/major');
};



const read = async (req: Request, res: Response) => {
  const { id } = req.params;
  const major = await majorService.getMajor(id);

  if (!major) {
    return res.status(404).send('Curso não encontrado.');
  }
  

  res.render('major/read', { major });
};


const update = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (req.method === 'GET') {
    const major = await majorService.getMajor(id);

    
    if (!major) {
      return res.status(404).send('Curso não encontrado.');
    }

    
    return res.render('major/update', { major });
  }

  const { name, code, description } = req.body;
  const { error } = majorSchema.validate({ name, code, description });
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  try {
    await majorService.updateMajor(id, { name, code, description });
    res.redirect('/major');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao atualizar o curso.');
  }
};



const remove = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await majorService.removeMajor(id);
    res.redirect('/major');
  } catch (err) {
    console.error(err);
    res.status(500).send('Erro ao remover o curso.');
  }
};

export default { index, create, read, update, remove };
