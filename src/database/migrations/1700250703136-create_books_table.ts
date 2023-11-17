import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";
import { DbTable } from "../../constants/DbTable";

export class CreateBooksTable1700250703136 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DbTable.BOOKS,
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: 'authorId',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'title',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'description',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'price',
                        type: 'int',
                        isNullable: false,
                    },
                    {
                        name: 'category',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'image',
                        type: 'varchar',
                        length: '255',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'datetime',
                        default: 'now()',
                        isNullable: true,
                    },
                    {
                        name: 'updated_at',
                        type: 'datetime',
                        default: 'now()',
                        isNullable: true,
                    }
                ]
            }), true
        );

        await queryRunner.createForeignKey(
            DbTable.BOOKS,
            new TableForeignKey({
                columnNames: ["authorId"],
                referencedColumnNames: ["id"],
                referencedTableName: DbTable.AUTHORS,
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DbTable.BOOKS);
    }

}
