import { TypeOrmModuleOptions } from "@nestjs/typeorm";
//import { User } from "src/auth/user.entity";
//import { Task } from "src/tasks/task.entity";

export const typeormConfig : TypeOrmModuleOptions = {
 type: 'postgres',
 host: 'localhost',
 port: 5432,
 username: 'postgres',
 password: 'postgres',
 database: 'taskmanagement',
 entities: [__dirname + '/../**/*.entity.{js,ts}'],
 synchronize: true, 
 
};