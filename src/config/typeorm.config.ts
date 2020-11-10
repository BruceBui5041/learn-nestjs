import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: "18.139.199.158",
    port: 3306,
    username: "dev",
    password: "dev2020",
    database: 'nest_db',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}   