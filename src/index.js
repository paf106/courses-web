const express = require('express');
const path = require('path');
// const cookieParser = require('cookie-parser');
const app = express();

// Routers
const webRouter = require('./routes/web');
const userRouter = require('./routes/user');


// Settings
app.set('port', 3000);
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Cookie Parser
// app.use(cookieParser());

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', webRouter);
app.use('/', userRouter);


// Static
app.use(express.static(path.join(__dirname, 'public')))

app.listen(process.env.PORT || app.get('port'), () => {
    console.log(`Listening on port ${app.get('port')}`);
});