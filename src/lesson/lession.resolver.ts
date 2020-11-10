import { ParseArrayPipe, ParseIntPipe } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Student } from 'src/student/student.entity';
import { Lesson } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';
import { LessonService } from './lesson.service';
import { LessonType } from './lesson.type';

@Resolver(() => LessonType)
export class LessonResolver {
    constructor(private lessonService: LessonService) {}

    @Query(returns => LessonType)
    lesson(@Args("id") id: number): Promise<Lesson> {
        return this.lessonService.getLesson(id)
    }

    @Query(returns => [LessonType])
    lessons(): Promise<Lesson[]>{
        return this.lessonService.getLessons()
    }

    @Mutation(retruns => LessonType)
    createLesson(@Args('createLessonInput') createLessonInput: CreateLessonInput): Promise<Lesson>{
        return this.lessonService.createLesson(createLessonInput)
    }

    @Mutation(returns => LessonType)
    assignStudentsToLesson(
        @Args("lessonId", ParseIntPipe) lessonId: number,
        @Args({name: "studentIds", type: () => [Int]}) studentIds: number[],
    ): Promise<Lesson> {
        return this.lessonService.assignStudentsToLesson(lessonId, studentIds)
    }
}
