import { Inject, ValidationPipe } from '@nestjs/common';
import { Args, Mutation, Resolver, Query, Subscription, Int, ResolveProperty } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateStudentInput } from './input/create-student.input';
import { UpdateStudentInput } from './input/update-student.input';
import { Student } from './student.entity';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver((type) => StudentType)
export class StudentResolver {
  constructor(
    private studentService: StudentService,
    @Inject("PUB_SUB")
    private pubSub: PubSub
  ) {}

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
    /** The property name of data return ({ onChangStudent }) need to equals Subscription's name */
    this.pubSub.publish('onChangeStudent', { onChangeStudent: result });
    return result;
  }

  @Subscription((returns) => StudentType, { 
    name: 'onChangeStudent',
    /** To filter out specific events */
    async filter(this: StudentResolver, payload, variables){
      /** variables is the args that inputed into the Subscription */
      return payload.onChangeStudent.id === variables.studentId
    },
    /** Mutating subscription payloads */
    resolve(this: StudentResolver, value) {
      /** "this" refers to an instance of "StudentResolver" */
      return value.onChangeStudent;
    }
  })
  onChangeStudent(@Args('studentId', {type: () => Int}) studentId: number) {
    return this.pubSub.asyncIterator('onChangeStudent');
  }
}
