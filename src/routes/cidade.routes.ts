import { Router } from 'express';

import CreateCidadeService from '../services/CreateCidadeService';

const cidadeRotas = Router();

cidadeRotas.post('/', async (request, response) => {
  const createCidade = new CreateCidadeService();

  const cidade = await createCidade.execute('estados', 'municipios');

  return response.json(cidade);
});

export default cidadeRotas;
