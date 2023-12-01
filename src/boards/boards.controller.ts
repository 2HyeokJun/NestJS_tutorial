import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardStatus } from './board-status.enum';
import { CreateBoardDTO } from './dto/create-board-dto';
import { BoardStatusValidationPipe } from 'src/boards/pipes/board-status-validation.pipe';
import { Board } from './boards.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('boards')
// @UseGuards(AuthGuard())
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get('/')
    getAllBoards(): Promise<Board[]> {
        return this.boardsService.getAllBoards();
    }

    @Get('/:id')
    getBoardById(@Param('id') id: number): Promise<Board> {
        return this.boardsService.getBoardById(id);
    }

    @Post('/')
    @UsePipes(ValidationPipe)
    createBoard(@Body() createBoardDTO: CreateBoardDTO): Promise<Board> {
        return this.boardsService.createBoard(createBoardDTO);
    }

    @Delete('/:id')
    deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.boardsService.deleteBoard(id);
    }

    @Patch('/:id/status')
    updateBoard(@Param('id', ParseIntPipe) id: number, @Body('status', BoardStatusValidationPipe) status: BoardStatus): Promise<Board> {
        return this.boardsService.updateBoard(id, status);
    }
}
