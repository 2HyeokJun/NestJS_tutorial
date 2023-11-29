import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDTO } from './dto/create-board-dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository)
        private boardRepository: BoardRepository
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.getAllBoards();
    }

    async getBoardById(id: number): Promise<Board> {
        return await this.boardRepository.getBoardById(id);
    }

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        return await this.boardRepository.createBoard(createBoardDTO)
    }

    async deleteBoard(id: number): Promise<void> {
        await this.boardRepository.deleteBoard(id);
    }

    async updateBoard(id: number, status: BoardStatus): Promise<Board> {
        return await this.boardRepository.updateBoard(id, status);
    }


}
