import { nanoid } from 'nanoid';
import { Category } from './category.entity';

export class Note {
  id: string;
  name: string;
  category: Category;
  content: string;
  dates: string[];
  createdAt: string;
  isActive: boolean;

  constructor(
    name: string,
    category: Category,
    content: string,
    id?: string,
    isActive?: boolean,
  ) {
    this.id = id || nanoid();
    this.name = name;
    this.category = category;
    this.createdAt = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date());
    this.isActive = isActive || true;
    this.content = content;
    this.setDates();
  }
  //updates note data
  updateNote(
    name: string,
    category: Category,
    content: string,
    isActive: boolean,
  ) {
    this.name = name;
    this.category = category;
    this.isActive = isActive;
    this.content = content;
    this.setDates();
  }
  //recalculates dates from content
  setDates() {
    this.dates =
      this.content.match(
        /\b(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/(?:[0-9]{4})/gm,
      ) || [];
  }
}
