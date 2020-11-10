import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStudentInput } from './create-student.input';
import { Student } from './student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
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
}
