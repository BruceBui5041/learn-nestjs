import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from 'src/lesson/lesson.entity';
import { Student } from './student.entity';
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([Student, Lesson])],
  providers: [StudentService, StudentResolver],
})
export class StudentModule {}
