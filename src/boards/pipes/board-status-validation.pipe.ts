import {BadRequestException, PipeTransform} from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOptions = [
    BoardStatus.PRIVATE,
    BoardStatus.PUBLIC,
  ];
  
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isCorrectStatus(value)) {
      throw new BadRequestException(`${value} isn't in the status options`)
    }

    return value;
  }

  private isCorrectStatus(value: any) {
    return this.statusOptions.includes(value);
  }
}