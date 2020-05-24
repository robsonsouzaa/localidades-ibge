import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import Cidade from './Cidade';

@Entity('estados')
class Estado {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  codigo: number;

  @Column()
  sigla: string;

  @Column()
  nome: string;

  @OneToMany(() => Cidade, cidade => cidade.estado)
  cidade: Cidade;

  @Column('boolean')
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Estado;
