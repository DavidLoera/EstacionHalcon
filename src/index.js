const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const methodOverride = require('method-override');


//Inicializaciones
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	layoutsDir: path.join(app.get('views'), 'layouts'),
	partialsDir: path.join(app.get('views'), 'partials'),
	extname: '.hbs'
}));
app.set('view engine', '.hbs');

// middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
	secret: 'halcondeoro',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Variables
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	res.locals.user = req.user || null;
	next();
  });

//routes
app.use(require('./routes'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use(require('./routes/cliente'));
app.use(require('./routes/compras'));
app.use(require('./routes/ventas'));
app.use(require('./routes/productos'));

//static files
app.use(express.static(path.join(__dirname, 'public')));

//error 404
app.use(function(req,res,next){
	res.status(404).render('error')
});

// listening the Server
app.listen(app.get('port'), () => {
  console.log('El sevidor se encuentra en el puerto ', app.get('port'));
});
