import { TypeOrmModuleOptions } from "@nestjs/typeorm";
console.log(__dirname+'/../**/*.entity.ts');
export const typeOrmConfig = () : TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: process.env.DB_SCHEMA,
    entities: [__dirname+'/../**/*.entity.{js,ts}'],
    synchronize: true,
})