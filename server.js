'use-strict';

require('dotenv').config()

const port = parseInt(process.env.PORT || 8000);
const express = require('express');
const path = require('path');
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

// Routes
const { 
    landingRoute,
    authRoutes,
    profileRoute
} = require('./app/controllers/routes/index');

const app = express();

app.engine('hbs', exphbs({ helpers: {
    dateFormat: (value) => {
        var date = new Date(value);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }
}, defaultLayout: 'main', extname: '.hbs', partialsDir: path.join(__dirname, './app/views/partials' )}));
app.set('views', path.join(__dirname, './app/views'));
app.set('view engine', 'hbs');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// main routes
app.use(landingRoute);
app.use(authRoutes);
app.use(profileRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

app.listen(port, () => console.log(`Client started and listening on port ${port}`));