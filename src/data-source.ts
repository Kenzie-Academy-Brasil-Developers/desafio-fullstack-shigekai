import "dotenv/config";
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path"



const dataSourceConfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, "./entities/**.{ts,js}");
    const migrationsPath: string = path.join(__dirname, "./migrations/**.{ts,js}");

    const dbURL: string | undefined = process.env.DATABASE_URL;

    if(!dbURL) throw new Error("Missing enviroment variable: 'DATABASE_URL'");

    return{
        type: "postgres",
        url: dbURL,
        entities: [entitiesPath],
        migrations: [migrationsPath],
        logging: false,
        synchronize: false
    };
};

export const AppDataSource: DataSource = new DataSource(dataSourceConfig())