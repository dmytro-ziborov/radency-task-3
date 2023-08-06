import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { Note } from './entities/note.entity';
import { Category } from './entities/category.entity';
import { CategoryStatsDTO } from './dto/category-stats.dto';
import { StatsDTO } from './dto/stats.dto';

@Injectable()
export class NotesService {
  private notes: Note[];
  private categories: Category[];

  constructor() {
    this.categories = [
      new Category(1, 'Task'),
      new Category(2, 'Random Through'),
      new Category(3, 'Idea'),
    ];
    this.notes = [
      new Note(
        'Shopping List',
        this.findCategory(1),
        'Tomatoes, potato, Coca-Cola',
        '1',
      ),
      new Note(
        'The should be something',
        this.findCategory(2),
        'something',
        '2',
      ),
      new Note(
        'Outer life',
        this.findCategory(3),
        'Should we look for life beyond Earth',
        '3',
      ),
      new Note(
        'Make pull request',
        this.findCategory(1),
        'tomorrow (7/29/2023) at 6 am or later',
        '4',
      ),
      new Note(
        'Not empty note!',
        this.findCategory(2),
        "This note isn't empty",
        '5',
      ),
      new Note(
        "Previous note's name isn't empty",
        this.findCategory(2),
        "Note's name can't be empty, also note content can be empty.",
        '6',
      ),
      new Note(
        'Just a note with a dates',
        this.findCategory(2),
        '1/1/2023 next 5/31/2041 , 12/12/2012, 31/31/2021-not valid.',
        '7',
      ),
    ];
  }

  //returns category by Id, otherwise - throws NotFound
  private findCategory(id: number) {
    const category = this.categories.find((c) => c.id === id);
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  create(createNoteDto: CreateNoteDto) {
    const category = this.findCategory(createNoteDto.category);

    this.notes.push(
      new Note(createNoteDto.name, category, createNoteDto.content),
    );
  }

  //returns all notes
  findAll() {
    return this.notes;
  }
  //returns note by Id, otherwise - throws NotFound
  findOne(id: string) {
    const note = this.notes.find((n) => n.id === id);
    if (!note) throw new NotFoundException('Note not found');
    return note;
  }
  //updates existing note
  update(id: string, updateNoteDto: UpdateNoteDto) {
    const note = this.findOne(id);
    const category = this.findCategory(updateNoteDto.category);

    const { name, content, isActive } = updateNoteDto;
    note.updateNote(name, category, content, isActive);
  }
  //removes note from storage
  remove(id: string) {
    const noteId = this.notes.findIndex((n) => n.id === id);
    if (noteId === -1) throw new NotFoundException('Note note found');
    this.notes.splice(noteId, 1);
  }
  //returns notes by status
  private getNotesByStatus(status: boolean) {
    return this.notes.filter((note) => note.isActive === status);
  }

  getArchiveNotes() {
    return this.getNotesByStatus(false);
  }
  getActiveNotes() {
    return this.getNotesByStatus(true);
  }
  //calculates stats for each category in storage
  stats() {
    const active = this.getActiveNotes();
    const archived = this.getArchiveNotes();

    const stats = this.categories.map(
      (category) =>
        new CategoryStatsDTO(
          category.name,
          active.filter((note) => note.category.id == category.id).length,
          archived.filter((note) => note.category.id == category.id).length,
        ),
    );
    return new StatsDTO(stats);
  }
}
