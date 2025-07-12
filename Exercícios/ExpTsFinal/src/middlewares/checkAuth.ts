// Exercícios/ExpTsFinal/src/middlewares/checkAuth.ts

import { Request, Response, NextFunction } from 'express';

interface AuthenticatedRequest extends Request {
  session: {
    user?: {
      id: string;
      name: string;
      email: string;
    };
  } & Request['session'];
}

export function checkAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (req.session.user) return next();
  return res.redirect('/login');
}




