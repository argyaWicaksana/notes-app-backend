import Hapi from '@hapi/hapi';
import notes from './api/notes/index.js';
import NotesService from './services/postgres/NotesService.js';
import NotesValidator from './validator/notes/index.js';
import dotenv from 'dotenv';

dotenv.config();

const init = async () => {
    const noteService = new NotesService();

    const server = Hapi.server({
        port: process.env.PORT,
        host: process.env.HOST,
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    await server.register({
        plugin: notes,
        options: {
            service: noteService,
            validator: NotesValidator,
        },
    });

    await server.start();
    console.log(`Server running on ${server.info.uri}`);
};

init();
