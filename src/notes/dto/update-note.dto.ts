//Describes data transfer object for note update
export class UpdateNoteDto {
  name: string;
  category: number;
  content: string;
  isActive: boolean;
}
