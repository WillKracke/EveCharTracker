const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const redis = require('redis');
const csrf = require('csurf');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/EveSkillTracker';

let mongooseOptions;

mongoose.connect(dbURL, mongooseOptions, (err) => {
    if (err) {
        console.log('Connection to Database Failed');
        throw err;
    }
});

let redisURL = {
    hostname: 'redis-11017.c14.us-east-1-2.ec2.cloud.redislabs.com',
    port: 11017,
};

let redisPASS = 'd2jPtKhB0oqrQO00tfNIhHRjdK6YVuG3';
if (process.env.REDISCLOUD_URL) {
    redisURL = url.parse(process.env.REDISCLOUD_URL);
    [, redisPASS] = redisURL.auth.split(':');
}
let redisClient = redis.createClient({
    host: redisURL.hostname,
    port: redisURL.port,
    password: redisPASS,
});

const router = require('./router.js');
const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true,
}));

app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.disable('x-powered-by');
app.use(cookieParser());

app.use(bodyParser.urlencoded({
    extended: true,
}));
app.use(session({
    key: 'sessionid',
    store: new RedisStore({
        client: redisClient,
    }),
    secret: 'Domo Arigato',
    resave: true,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
    },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(csrf());
app.use((err, req, res, next) => {
    if (err.code !== 'EBADCSRFTOKEN') return next(err);

    console.log('Missing CSRF Token');
    return false;
});

router(app);

app.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Listening at ${port}`);
});