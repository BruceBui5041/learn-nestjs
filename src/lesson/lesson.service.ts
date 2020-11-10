import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/student/student.entity';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Injectable()
export class LessonService {
    constructor(
        @InjectRepository(Lesson)
        private lessonRepository: Repository<Lesson>,
        @InjectRepository(Student)
        private studentRepository: Repository<Student>
    ) {}

    async getLesson(id: number): Promise<Lesson> { 
        const result = await this.lessonRepository.findOne({ relations: ["students"], where: { id } })
        if(!result) throw new NotFoundException("Lesson not found")
        return result
    }

    async getLessons() : Promise<Lesson[]> {
        return this.lessonRepository.find({ relations: ["students"] })
    }

    async createLesson(createLessonInput: CreateLessonInput) : Promise<Lesson> {
        const {name, startDate, endDate} = createLessonInput
        const lesson = this.lessonRepository.create({
            name,
            startDate,
            endDate
        })
        
        return this.lessonRepository.save(lesson)
    }

    async assignStudentsToLesson(lessonId: number, studentIds: number[]): Promise<Lesson>{
        const lesson = await this.lessonRepository.findOne(lessonId)
        const students = await this.studentRepository.findByIds(studentIds)
        if(!students) throw new NotFoundException("Students not found")
        lesson.students = students
        return this.lessonRepository.save(lesson)
    }
}
