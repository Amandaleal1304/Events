import express from 'express';
import session from 'express-session';
import css from 'connect-session-sequelize';
import { create } from 'express-handlebars';
import event_router from './routers/event_router.js';
import organizer_router from './routers/organizer_router.js';
import category_router from './routers/category_router.js';
import participant_router from './routers/participant_router.js';
import syncer from './database/syncer.js';
import user_router from './routers/user_router.js';
import sequelize from './database/mysql.js';
import { checkLogged } from './controllers/user_controller.js';

if(!await syncer()){
    process.exit();
}

const app = express();
app.use(express.json());

const hbs = create({
    extname: '.handlebars',
    defaultLayout: 'main',
    layoutsDir: 'views/layouts/',
    partialsDir: 'views/partials/',
    runtimeOptions: {
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
});

// Helper para comparar se dois valores são iguais.
hbs.handlebars.registerHelper('eq', (a, b) => {
    return a == b;
});

// CORREÇÃO: Renomeado o helper de 'inc' para 'contains' para corresponder à view.
hbs.handlebars.registerHelper('contains', (array, item) => {
    if (typeof array != 'undefined' && Array.isArray(array)) {
        return array.indexOf(item) !== -1;
    }
    return false;
});

const SequelizeStore = css(session.Store);

const sequelizeStore = new SequelizeStore({
    db: sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 5 * 60 * 1000,
    expiration: 1 * 60 * 60 * 1000 
});

app.use(session({
    secret: '*&long+and+secure+secret=%445',
    name: 'sess_cookie_param',
    store: sequelizeStore,
    cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        secure: false, 
        httpOnly: true
    },
    saveUninitialized: false, 
    resave: false
}));

await sequelizeStore.sync();
app.use(express.urlencoded({ extended: true })); // Adicionado extended: true por boa prática

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

app.use('/events', checkLogged, event_router);
app.use('/organizers', checkLogged, organizer_router);
app.use('/categories', checkLogged, category_router);
app.use('/participants', checkLogged, participant_router);
app.use('/users', user_router);

app.use(express.static('public')); // Adicionado para servir arquivos estáticos como CSS/JS

app.listen(80, () => {
    console.log('Escutando...');
});
