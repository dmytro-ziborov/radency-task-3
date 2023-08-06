import * as Joi from 'joi';
import { CreateNoteDto } from 'src/notes/dto/create-note.dto';

export const createNoteSchema = Joi.object<CreateNoteDto>({
  name: Joi.string().required(),
  category: Joi.number().required(),
  content: Joi.string().required(),
}).options({
  abortEarly: false,
});
