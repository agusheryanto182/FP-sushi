const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const app = express();

// router
const authRouter = require('./app/api/v1/auth/router');
const usersRouter = require('./app/api/v1/users/router');
const productsRouter = require('./app/api/v1/products/router');
const orderRouter = require('./app/api/v1/orders/router');
const offerRouter = require('./app/api/v1/offers/router');

const v1 = '/api/v1';

const notFoundMiddleware = require('./app/middlewares/not-found');
const handleErrorMiddleware = require('./app/middlewares/handler-error');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Welcome to api suki sushi',
    });
});

app.use(`${v1}`, authRouter);
app.use(`${v1}`, usersRouter);
app.use(`${v1}`, productsRouter);
app.use(`${v1}`, orderRouter);
app.use(`${v1}`, offerRouter);

app.use(notFoundMiddleware);
app.use(handleErrorMiddleware);

module.exports = app;
