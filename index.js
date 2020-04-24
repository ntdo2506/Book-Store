const express = require('express');
const app = express();
const bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
const port = 3000

const bookRouter = require('./router/book.router');
const userRouter = require('./router/user.router');
const transactionRouter = require('./router/transaction.router')
const authRouter = require("./router/auth.router");
const menuRouter = require("./router/transactionMenu.router")
const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require('./middlewares/admin.middleware');

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded
app.use(cookieParser())

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res) =>{res.render("index")})

app.use(express.static('public'))

app.use('/auth', authRouter);
app.use('/books', authMiddleware.authRequire, adminMiddleware.requireRole(true), bookRouter);
app.use('/users', authMiddleware.authRequire, adminMiddleware.requireRole(true), userRouter);
app.use('/transactions', authMiddleware.authRequire, adminMiddleware.requireRole(true), transactionRouter)
app.use('/transaction', authMiddleware.authRequire, adminMiddleware.requireRole(false), menuRouter)

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
