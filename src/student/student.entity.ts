import { Lesson } from "src/lesson/lesson.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    lastName: string

    @ManyToMany(() => Lesson, lesson => lesson.students)
    lessons: Lesson[]
}