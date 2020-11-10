import { BadRequestException, PipeTransform } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]

    /**
     * This function provided by PipeTrasform interface
     * @param value 
     * @param metadata
     */
    transform(value: any){
        value = value.toUpperCase()
        if(!this.isStatusValid(value)){
            throw new BadRequestException(`"${value}" is an invalid status`)
        }
        return value
    }

    private isStatusValid(status: any){
        return this.allowStatuses.includes(status)
    }
}