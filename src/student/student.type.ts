import { Field, ObjectType } from "@nestjs/graphql";
import { Lesson } from "src/lesson/lesson.entity";
import { LessonType } from "src/lesson/lesson.type";

@ObjectType("Student")
export class StudentType {
    @Field()
    id: number

    @Field()
    firstName: string

    @Field()
    lastName: string

    @Field(type => [LessonType], {nullable: true})
    lessons: LessonType[]
}