const express = require('express');
const routes = require('./controllers');
const sequelize = require('./config/connection');

// import sessions library
const session = require('express-session');
const app = express();
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const path = require('path');
//middleware for front end
app.use(express.static(path.join(__dirname, 'public')));

app.get('/homepage', (req, res) => {
 res.render('event');
});

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded( {extended: true} ));

// session middleware
const sess = {
    secret: 'secretMessage',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({db:sequelize})
};

app.use(session(sess));

//turn on routes last
app.use(routes);

const exhbs = require('express-handlebars');
const hbs = exhbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// turn on connection to db and server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});