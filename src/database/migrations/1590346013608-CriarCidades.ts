import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CriarCidades1590346013608 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cidades',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'codigo',
            type: 'integer',
            isUnique: true,
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'estado_id',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'ativo',
            type: 'boolean',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'cidades',
      new TableForeignKey({
        name: 'CidadeEstado',
        columnNames: ['estado_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'estados',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('cidades', 'CidadeEstado');
    await queryRunner.dropTable('cidades');
  }
}
