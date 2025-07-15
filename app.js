import express from 'express';
import event_router from   './routers/event_router.js';
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

app.listen(80, () => {

    console.log('Escutando...');

});