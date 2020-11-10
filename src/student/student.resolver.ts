import { Args, Mutation, Resolver, Query } from "@nestjs/graphql";
import { CreateStudentInput } from "./create-student.input";
import { Student } from "./student.entity";
import { StudentService } from "./student.service";
import { StudentType } from "./student.type";

@Resolver(type => StudentType)
export class StudentResolver {
    constructor(private studentService: StudentService) {}

    @Query(returns => [StudentType])
    getStudents(): Promise<Student[]> {
        return this.studentService.getStudents()
    }

    @Query(returns => StudentType)
    getStudentById(@Args("id") id: number) : Promise<Student> {
        return this.studentService.getStudentById(id)
    }

    @Mutation(returns => StudentType)
    createStudent(@Args('createStudentInput') createStudentInput: CreateStudentInput): Promise<Student> {
        return this.studentService.createStudent(createStudentInput)
    }
}