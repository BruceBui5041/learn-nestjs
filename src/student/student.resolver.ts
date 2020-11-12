import { ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Subscription, Int, ResolveProperty } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Lesson } from 'src/lesson/lesson.entity';
import { CreateStudentInput } from './input/create-student.input';
import { UpdateStudentInput } from './input/update-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

const pubSub = new PubSub();
@Resolver((type) => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query((returns) => [StudentType])
  getStudents(): Promise<Student[]> {
    return this.studentService.getStudents();
  }

  @Query((returns) => StudentType)
  getStudentById(@Args('id') id: number): Promise<Student> {
    return this.studentService.getStudentById(id);
  }

  @Mutation((returns) => StudentType)
  createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentInput);
  }

  @Mutation((returns) => StudentType)
  async updateStudent(
    @Args('id') studentId: number,
    @Args({name: 'updateStudentInput', type: () => UpdateStudentInput }, ValidationPipe)
    updateStudentInput: UpdateStudentInput,
  ): Promise<Student> {
    const result = await this.studentService.updateStudent(
      studentId,
      updateStudentInput,
    );
    pubSub.publish('onChangeStudent', { onChangeStudent: result });
    return result;
  }

  @Subscription((returns) => StudentType, { name: 'onChangeStudent' })
  onChangeStudent() {
    return pubSub.asyncIterator('onChangeStudent');
  }
}
