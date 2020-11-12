import { Field, InputType, Int } from "@nestjs/graphql"
import { IsOptional, MinLength } from "class-validator"

@InputType()
export class UpdateStudentInput {
    @IsOptional()
    @Field({nullable: true})
    @MinLength(1)
    firstName: string

    @IsOptional()
    @Field({nullable: true})
    @MinLength(1)
    lastName: string
    
    @IsOptional()
    @Field(() => [Int!]!, {nullable: true})
    lessonIds: number[]
}