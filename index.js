require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const port = 3000;

var mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true });

const bookRouter = require("./router/book.router");
const userRouter = require("./router/user.router");
const transactionRouter = require("./router/transaction.router");
const authRouter = require("./router/auth.router");
const menuRouter = require("./router/transactionMenu.router");
const storeRoute = require("./router/store.router");
const cartRoute = require("./router/cart.router");

const apiLoginRouter = require("./api/routers/login.router");
const apiTransactionsRouter = require("./api/routers/transactions.router");
const apiBookRouter = require("./api/routers/book.router");
const apiUserRouter = require("./api/routers/user.router");

const shopBookRouter = require("./shop/routers/book.router");
const shopTransactionRouter = require("./shop/routers/transaction.router");
const shopLoginRouter = require("./shop/routers/login.router");
const shopCreateAccountRouter = require("./shop/routers/createAccount.router");

const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");
const sessionMiddleware = require("./middlewares/session.middleware");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.SESSION_SECRET));
app.use(sessionMiddleware);

app.set("view engine", "pug");
app.set("views", "./views");

app.get("/", (req, res) => {
    res.render("index");
});

app.use(express.static("public"));

app.use("/auth", authRouter);
app.use(
    "/books",
    authMiddleware.authRequire,
    adminMiddleware.requireRole(true),
    bookRouter
);
app.use(
    "/users",
    authMiddleware.authRequire,
    adminMiddleware.requireRole(true),
    userRouter
);
app.use(
    "/transactions",
    authMiddleware.authRequire,
    adminMiddleware.requireRole(true),
    transactionRouter
);
app.use(
    "/transaction",
    authMiddleware.authRequire,
    adminMiddleware.requireRole(false),
    menuRouter
);
app.use("/store", storeRoute);
app.use("/cart", cartRoute);

app.use("/api", apiLoginRouter);
app.use("/api", apiTransactionsRouter);
app.use("/api", apiBookRouter);
app.use("/api", apiUserRouter);

app.use("/shop", shopLoginRouter);
app.use("/shop", shopCreateAccountRouter);
app.use("/shop", shopBookRouter);
app.use("/shop", shopTransactionRouter);

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`)
);
