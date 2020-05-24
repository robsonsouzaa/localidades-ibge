import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Estado from './Estado';

@Entity('cidades')
class Cidade {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('integer')
  codigo: number;

  @Column()
  nome: string;

  @ManyToOne(() => Estado, estado => estado.cidade, { eager: true })
  @JoinColumn({ name: 'estado_id' })
  estado: Estado;

  @Column()
  estado_id: number;

  @Column('boolean')
  ativo: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Cidade;
