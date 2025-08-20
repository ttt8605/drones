if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

// Require plugins
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const flash = require('connect-flash');
const User = require('./models/user');
const express = require('express');
const app = express();
const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressErrors');
const path = require('path');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const MongoStore = require("connect-mongo")


const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/Drones';

// Setting up mongoose/mongodb
const mongoose = require('mongoose');
mongoose.connect(dbUrl)

.then(() => {
    console.log('Mongo connection open');
})
.catch(err => {
    console.error('Mongo connection error:', err);
});

// EJS Mate
const ejsMate = require('ejs-mate');

// Setting up stylesheets
app.use(express.static('public'));

// Set up EJS with EJS Mate
app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet({contentSecurityPolicy:false}));

// Parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Method override for form submissions
app.use(methodOverride('_method'));

// Sanitize data to prevent MongoDB Operator Injection
app.use(mongoSanitize());


// Session setup
const secret = process.env.SESSION_SECRET || 'thisshouldbeabettersecret';

const store = MongoStore.create({
    mongoUrl: dbUrl,
    collectionName: 'sessions', // Ensure correct collection name
    ttl: 60 * 60 * 24, // 1 day in seconds
    autoRemove: 'native', // Automatically remove expired sessions
    touchAfter: 24 * 60 * 60,
    crypto: {
        secret
    }
});
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: '/', // Default path for cookies
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
    
};
app.use(session(sessionConfig));

// Flash middleware
app.use(flash());

// Passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware to set locals for templates
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// Routes
const dronesRoutes = require('./routes/drones');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');
const userRoutes = require('./routes/auth');
const serviciiRoutes = require('./routes/servici');
const reviewRoutes = require('./routes/reviews')

app.get('/', (req, res) => {
    res.redirect('/projects');
});

app.use('/drones', dronesRoutes);
app.use('/projects', projectsRoutes);
app.use('/contact', contactRoutes);
app.use('/services',serviciiRoutes);
app.use('/review',reviewRoutes);
app.use('/', userRoutes);


// Handle 404 errors
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

// Error-handling middleware
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, Something went wrong';
    res.status(statusCode).render('error', { err });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});