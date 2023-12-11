import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationFile1699409535487 implements MigrationInterface {
    name = 'MigrationFile1699409535487'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`likes\` (\`id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`thread_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`replies\` (\`id\` varchar(255) NOT NULL, \`content\` varchar(500) NOT NULL, \`image\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, \`thread_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`threads\` (\`id\` varchar(255) NOT NULL, \`content\` varchar(500) NOT NULL, \`image\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), \`user_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`username\` varchar(50) NOT NULL, \`fullname\` varchar(100) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` text NOT NULL, \`profile_picture\` text NOT NULL, \`bio\` varchar(250) NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updated_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`uploads\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cloudinary_id\` varchar(500) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`following\` (\`following_id\` varchar(36) NOT NULL, \`follower_id\` varchar(36) NOT NULL, INDEX \`IDX_45428a713ee7d51def21b67ff2\` (\`following_id\`), INDEX \`IDX_59f580ba79fe33c121f8c3cc09\` (\`follower_id\`), PRIMARY KEY (\`following_id\`, \`follower_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_3f519ed95f775c781a254089171\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_dfee0c14f2a697eeb0b0bfc50cc\` FOREIGN KEY (\`thread_id\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_c961efa3687d100ed22cd409534\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`replies\` ADD CONSTRAINT \`FK_1af58ca9000874da2171004d164\` FOREIGN KEY (\`thread_id\`) REFERENCES \`threads\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`threads\` ADD CONSTRAINT \`FK_a6cc1a07ec07e376947ed1016a0\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_45428a713ee7d51def21b67ff20\` FOREIGN KEY (\`following_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`following\` ADD CONSTRAINT \`FK_59f580ba79fe33c121f8c3cc095\` FOREIGN KEY (\`follower_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_59f580ba79fe33c121f8c3cc095\``);
        await queryRunner.query(`ALTER TABLE \`following\` DROP FOREIGN KEY \`FK_45428a713ee7d51def21b67ff20\``);
        await queryRunner.query(`ALTER TABLE \`threads\` DROP FOREIGN KEY \`FK_a6cc1a07ec07e376947ed1016a0\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_1af58ca9000874da2171004d164\``);
        await queryRunner.query(`ALTER TABLE \`replies\` DROP FOREIGN KEY \`FK_c961efa3687d100ed22cd409534\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_dfee0c14f2a697eeb0b0bfc50cc\``);
        await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_3f519ed95f775c781a254089171\``);
        await queryRunner.query(`DROP INDEX \`IDX_59f580ba79fe33c121f8c3cc09\` ON \`following\``);
        await queryRunner.query(`DROP INDEX \`IDX_45428a713ee7d51def21b67ff2\` ON \`following\``);
        await queryRunner.query(`DROP TABLE \`following\``);
        await queryRunner.query(`DROP TABLE \`uploads\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`threads\``);
        await queryRunner.query(`DROP TABLE \`replies\``);
        await queryRunner.query(`DROP TABLE \`likes\``);
    }

}
