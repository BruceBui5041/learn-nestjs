import { Student } from "src/student/student.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("lessons")
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    startDate: string
    
    @Column()
    endDate: string

    @ManyToMany(() => Student, student => student.lessons)
    @JoinTable()
    students: Student[]
}