import express from 'express';
import session from 'express-session';
import css from 'connect-session-sequelize';
import { create } from 'express-handlebars';
import event_router from   './routers/event_router.js';
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

hbs.handlebars.registerHelper('eq', function(arg1, arg2) {
    return (arg1 == arg2);
});

hbs.handlebars.registerHelper('inc', function(arg1, arg2) {
    if(typeof arg1 == 'undefined') {
        return false;
    }
    return (arg1.indexOf(arg2) !== -1);
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
        secure: false, // if using HTTPS
        httpOnly: true // somente browsers
    },
    saveUninitialized: false, 
    resave: false
}));

await sequelizeStore.sync();
app.use(express.urlencoded());

// app.use(express.json()); permitir a comunicacao em json
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

app.listen(80, () => {
    console.log('Escutando...');
});