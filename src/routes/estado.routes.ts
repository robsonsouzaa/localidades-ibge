import { Router } from 'express';

import CreateEstadoService from '../services/CreateEstadoService';

const estadoRouter = Router();

estadoRouter.post('/', async (request, response) => {
  const createEstado = new CreateEstadoService();

  const estado = await createEstado.execute('estados');

  return response.json(estado);
});

export default estadoRouter;
