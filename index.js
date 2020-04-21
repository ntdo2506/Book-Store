const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const shortid = require('shortid');
const port = 3000

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
 
const adapter = new FileSync('db.json')
const db = low(adapter)

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 
// for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/books', (req, res) => {
  res.render("index", {
    bookList: db.get("books").value()
  });
});

app.get('/books/add', (req, res) => {
  res.render("add/index")
});

app.post("/books/add", (req, res) =>{
  req.body.id = shortid.generate();
  db.get("books").push(req.body).write();
  res.redirect("/books");
});

app.get("/books/:id/delete", (req, res) =>{
  let id = req.params.id
  db.get("books").remove({id: id}).write();
  res.redirect("/books");
});

app.get("/books/:id", (req, res) =>{
  let id = req.params.id
  let book = db.get('books')
  .find({ id: id })
  .write()
  res.render("update/index", {
    book: book
  })
});

app.post("books/update", (req, res) => {
  let id = req.body.id
  db.get('books')
  .find({ id: id })
  .assign({ title: req.body.title })
  .write()
  res.redirect("/books");
})

// listen for requests :)
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
