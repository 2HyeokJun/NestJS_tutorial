import {BadRequestException, PipeTransform} from '@nestjs/common';
import { BoardStatus } from 'src/boards/boards.model';

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