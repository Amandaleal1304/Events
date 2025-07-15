import express from 'express';
import event_router from   './routers/event_router.js';
import organizer_router from './routers/organizer_router.js';
import category_router from './routers/category_router.js';
import participant_router from './routers/participant_router.js';
import { syncer } from './database/mysql.js';

if(!await syncer()){
    process.exit();
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {

    res.end('Rodando...');

});

app.use('/events', event_router);
app.use('/organizers', organizer_router);
app.use('/categories', category_router);
app.use('/participants', participant_router);

app.listen(80, () => {

    console.log('Escutando...');

});