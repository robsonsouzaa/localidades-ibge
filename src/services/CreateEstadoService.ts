import { getRepository } from 'typeorm';

import api from './api';

import Estado from '../models/Estado';

interface Request {
  id: number;
  sigla: string;
  nome: string;
}

class CreateEstadoService {
  public async execute(enderecoURL: string): Promise<Estado[]> {
    const estadoRepositorio = getRepository(Estado);

    const response = await api.get(enderecoURL);

    const estados: Request[] = response.data;

    const criaEstado = estadoRepositorio.create(
      estados.map(estado => ({
        codigo: estado.id,
        sigla: estado.sigla,
        nome: estado.nome,
        ativo: true,
      })),
    );

    await estadoRepositorio.save(criaEstado);

    return criaEstado;
  }
}

export default CreateEstadoService;
