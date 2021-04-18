import { BaseDatabase } from "../data/BaseDatabase";

export class MySqlSetup extends BaseDatabase {
    public async createTable(): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS BIKESHOP_USER (
                    id VARCHAR(255) PRIMARY KEY,
                    name VARCHAR(255) NOT NULL,
                    email VARCHAR(255) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL
                )
            `)

            await BaseDatabase.connection.raw(`
                CREATE TABLE IF NOT EXISTS BIKESHOP_BIKE (
                    id VARCHAR(255) PRIMARY KEY,
                    color VARCHAR(255) NOT NULL,
                    gear INT NOT NULL,
                    brand VARCHAR(255) NOT NULL,
                    model VARCHAR(255) NOT NULL,
                    price DECIMAL(10,2) NOT NULL,
                    author_id VARCHAR(255) NOT NULL,
                    FOREIGN KEY(author_id) REFERENCES BIKESHOP_USER(id)
                )
            `)


            console.log("MySql setup completed!")

            BaseDatabase.connection.destroy()

        } catch (error) {
            console.log(error.sqlMessage || error.message)

            BaseDatabase.connection.destroy()
        }
    }
}

new MySqlSetup().createTable()