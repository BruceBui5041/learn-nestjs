import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LessonModule } from './lesson/lesson.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    GraphQLModule.forRoot({
      // autoSchemaFile: 'schema.gql',
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
    TasksModule,
    AuthModule,
    StudentModule,
  ]
})
export class AppModule {}
