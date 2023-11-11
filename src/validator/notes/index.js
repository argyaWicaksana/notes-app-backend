import InvariantError from '../../exceptions/InvariantError.js';
import {NotePayloadSchema} from './schema.js';

export default {
    validateNotePayload: (payload) => {
        const validationResult = NotePayloadSchema.validate(payload);

        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};
