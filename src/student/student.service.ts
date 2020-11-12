import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PubSub } from 'graphql-subscriptions';
import { Lesson } from 'src/lesson/lesson.entity';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './input/create-student.input';
import { UpdateStudentInput } from './input/update-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    @InjectRepository(Lesson)
    private lessonRespository: Repository<Lesson>
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['lessons'] });
  }

  async getStudentById(id: number): Promise<Student> {
    return this.studentRepository.findOne({
      relations: ['lessons'],
      where: { id },
    });
  }

  async createStudent(createStudent: CreateStudentInput): Promise<Student> {
    const { lastName, firstName } = createStudent;
    const student = this.studentRepository.create({ firstName, lastName });
    return this.studentRepository.save(student);
  }

  async updateStudent(studentId: number, updateStudentInput: UpdateStudentInput): Promise<Student> {
    const student = await this.studentRepository.findOne({relations: ["lessons"], where: { id: studentId }})
    const { lastName, firstName, lessonIds } = updateStudentInput
    if(!student) throw new NotFoundException("Student not found")
    if(lessonIds){
      const lessons = await this.lessonRespository.findByIds(lessonIds)
      if(lessons && lessons.length > 0) student.lessons = lessons
    }
    if(lastName) student.lastName = lastName
    if(firstName) student.firstName = firstName
    return this.studentRepository.save(student)
  }
}
