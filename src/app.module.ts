import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { LessonModule } from './lesson/lesson.module';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { StudentModule } from './student/student.module';
import { PubSub } from 'graphql-subscriptions';
import { PubSubModule } from './pub-sub/pub-sub.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    /**Use ConfigModule to add config file to the project*/
    ConfigModule.forRoot({ envFilePath: [`.env.${process.env.STAGE}`] }),
    /** use useFactory to import DB config async */
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService): Promise<TypeOrmModuleOptions> => {
        return {
          type: 'mysql',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT')),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_NAME'),
          // entities: [__dirname + '/../**/*.entity.{js,ts}'],
        };
      },
    }),
    GraphQLModule.forRoot({
      // autoSchemaFile: 'schema.gql',
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      /** To customize the subscriptions server (e.g., change the listener port) */
      subscriptions: {
        keepAlive: 5000,
      },
    }),
    LessonModule,
    StudentModule,
    TasksModule,
    AuthModule,
    StudentModule,
    PubSubModule,
  ],
})
export class AppModule {}
