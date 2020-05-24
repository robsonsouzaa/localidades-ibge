import { getRepository } from 'typeorm';

import api from './api';

import Estado from '../models/Estado';
import Cidade from '../models/Cidade';

interface CidadeModelo {
  id: number;
  nome: string;
  estado: number;
  microrregiao: {
    mesorregiao: {
      UF: {
        id: number;
      };
    };
  };
}

interface EstadoModelo {
  id: number;
  sigla: string;
  nome: string;
}

class CreateCidadeService {
  async execute(estadoUrl: string, cidadeUrl: string): Promise<Cidade[]> {
    const cidadeRepositorio = getRepository(Cidade);
    const estadoRepositorio = getRepository(Estado);

    const response = await api.get(estadoUrl);

    const estados: EstadoModelo[] = response.data;

    const novosEstados = estadoRepositorio.create(
      estados.map(estado => ({
        codigo: estado.id,
        sigla: estado.sigla,
        nome: estado.nome,
        ativo: true,
      })),
    );

    await estadoRepositorio.save(novosEstados);

    const respCidade = await api.get(cidadeUrl);

    const cidades: CidadeModelo[] = respCidade.data;

    const criaCidade = cidadeRepositorio.create(
      cidades.map(cidade => ({
        codigo: cidade.id,
        nome: cidade.nome,
        ativo: true,
        estado: novosEstados.find(
          estado => estado.codigo === cidade.microrregiao.mesorregiao.UF.id,
        ),
      })),
    );
    await cidadeRepositorio.save(criaCidade);

    return criaCidade;
  }
}

export default CreateCidadeService;
