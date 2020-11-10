import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { LessonResolver } from './lession.resolver';
import { Lesson } from './lesson.entity';
import { LessonService } from './lesson.service';

@Module({
    imports: [TypeOrmModule.forFeature([Lesson, Student])],
    providers: [LessonResolver, LessonService]
})
export class LessonModule {}
