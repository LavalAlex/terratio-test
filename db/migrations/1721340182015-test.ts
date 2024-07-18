import { MigrationInterface, QueryRunner } from "typeorm";

export class Test1721340182015 implements MigrationInterface {
    name = 'Test1721340182015'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`plots\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total\` float NOT NULL, \`reference\` varchar(255) NULL, \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removedDate\` datetime NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sides\` (\`id\` int NOT NULL AUTO_INCREMENT, \`x0\` float NOT NULL, \`y0\` float NOT NULL, \`x1\` float NOT NULL, \`y1\` float NOT NULL, \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`lastUpdateDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`removedDate\` datetime NULL, \`plotId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`sides\` ADD CONSTRAINT \`FK_f07d6042c98a559438343a9ded6\` FOREIGN KEY (\`plotId\`) REFERENCES \`plots\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`sides\` DROP FOREIGN KEY \`FK_f07d6042c98a559438343a9ded6\``);
        await queryRunner.query(`DROP TABLE \`sides\``);
        await queryRunner.query(`DROP TABLE \`plots\``);
    }

}
