import { Field, ID, ObjectType } from '@nestjs/graphql'
import { StudentType } from 'src/student/student.type'

@ObjectType("Lesson")
export class LessonType {
    @Field(type => ID)
    id: number

    @Field()
    name: string

    @Field()
    startDate: string

    @Field()
    endDate: string

    @Field(type => [StudentType], {nullable: true})
    students: StudentType[]
}