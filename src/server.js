import Hapi from '@hapi/hapi';
import notes from './api/notes/index.js';
import NotesService from './services/inMemory/NotesService.js';
import NotesValidator from './validator/notes/index.js';

const init = async () => {
    const noteService = new NotesService();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
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
