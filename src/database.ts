import { Sequelize } from 'sequelize-typescript';
export class Database {

    init(): void {
        if (process.env.SQLITE_ENABLED) {
            this.initSqlite();
        } else {
            this.initPostgreSql();
        }
    }

    private initSqlite() {
        const sequelize = new Sequelize('sqlite://snake.db');
        sequelize.addModels([__dirname + '/model']);
    }

    private initPostgreSql() {
        const sequelize = new Sequelize({
            host: process.env.POSTGRESQL_HOST,
            database: process.env.POSTGRESQL_DATABASE,
            dialect: 'postgres',
            username: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PASSWORD,
            modelPaths: [__dirname + '/model']
        });
    }

}
