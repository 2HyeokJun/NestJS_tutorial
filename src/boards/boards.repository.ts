import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Board } from "./boards.entity";
import { CreateBoardDTO } from "./dto/create-board-dto";
import { BoardStatus } from "./board-status.enum";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class BoardRepository extends Repository<Board> {
    async getAllBoards(): Promise<Board[]> {
        return await this.find();
    }
    async getBoardById(id: number): Promise<Board> {
        let selectedBoard = await this.findOne({where: {id}});
        if (!selectedBoard) {
            throw new NotFoundException();
        }
        return selectedBoard;
    }

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board>  {
        const {title, description} = createBoardDTO;
        const board = this.create({
            title,
            description,
            status: BoardStatus.PUBLIC,
        })
        
        await this.save(board);
        return board;
    }

    async deleteBoard(id: number): Promise<void> {
        let deleteResult = await this.delete(id);
        if (deleteResult.affected === 0) {
            throw new NotFoundException(`cannot find board with id ${id}`);
        }
    }

    async updateBoard(id: number, status: BoardStatus): Promise<Board> {
        let targetBoard = await this.getBoardById(id);
        targetBoard.status = status;
        await this.save(targetBoard);

        return targetBoard;
    }
}