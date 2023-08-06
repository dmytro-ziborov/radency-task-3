import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { SchemaValidationPipe } from 'src/common/pipes/schema-validation/schema-validation.pipe';
import { createNoteSchema } from './common/schemas/create-note.schema';
import { UpdateNoteSchema } from './common/schemas/update-note.schema';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  @UsePipes(new SchemaValidationPipe(createNoteSchema))
  create(@Body() createNoteDto: CreateNoteDto) {
    this.notesService.create(createNoteDto);
  }

  @Get()
  findAll() {
    return this.notesService.findAll();
  }
  @Get('/stats')
  stats() {
    return this.notesService.stats();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(new SchemaValidationPipe(UpdateNoteSchema))
    updateNoteDto: UpdateNoteDto,
  ) {
    return this.notesService.update(id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(id);
  }
}
