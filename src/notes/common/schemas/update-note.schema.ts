import * as Joi from 'joi';
import { UpdateNoteDto } from 'src/notes/dto/update-note.dto';

export const UpdateNoteSchema = Joi.object<UpdateNoteDto>({
  name: Joi.string().required(),
  category: Joi.number().positive().required(),
  content: Joi.string().required(),
  isActive: Joi.boolean().required(),
}).options({
  abortEarly: false,
});
