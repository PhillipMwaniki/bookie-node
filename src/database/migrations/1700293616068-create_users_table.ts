import { MigrationInterface, QueryRunner, Table } from "typeorm"
import { DbTable } from "../../constants/DbTable";
import { Roles } from "../../constants/Role";

export class CreateUsersTable1700293616068 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: DbTable.USERS,
                columns: [
                    {
                        name: "id",
                        type: "varchar",
                        isPrimary: true,
                        isUnique: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "password",
                        type: "varchar",
                    },
                    {
                        name: "role",
                        type: "int",
                        default: Roles.USER,
                    },
                    {
                        name: "created_at",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                    {
                        name: "updated_at",
                        type: "datetime",
                        default: "now()",
                        isNullable: true,
                    },
                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(DbTable.USERS);
    }

}
