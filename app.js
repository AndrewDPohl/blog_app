var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  passport = require("passport"),
  session = require("cookie-session"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/authors", function (req, res) {
  db.author.findAll().then(function(authors){
    res.render("authors/index", {authorList: authors});
  })
});

app.get("/authors/new", function (req, res) {
  res.render("authors/new");
});

//post a new author 
app.post("/authors", function (req, res) {
  db.authors.create({
    firstName: req.body.author.firstName,
    lastName: req.body.author.lastName,
    age: req.body.author.age
  })
  console.log(req.body.author);
  res.redirect("/authors");
});

app.get("/authors/:id", function(req, res) {
  db.author.find(req.params.id)
  .then(function(authors) {
    res.render("authors/show", {author: author});
  })
});

app.get("/posts", function (req, res) {
  db.post.findAll().then(function(posts){
    res.render("posts/index"), {postList: posts};
  })
});

app.get("/posts/new", function(req, res){ 
  res.render("posts/new");
});

app.post("/posts",  function (req, res) {
  db.post.create({
    title: req.body.post.title,
    content: req.body.post.content
  })
  console.log(req.body.post);
  res.redirect("/posts");
});


app.get("/posts/:id", function(req, res) {
  db.post.find(req.params.id)
  .then(function(posts) {
    res.render("posts/show", {postsList: post});
  })
});






 db.sequelize.sync().then(function() {
    var server = app.listen(3000, function() {
    console.log(new Array(51).join("*"));
    console.log("\t LISTENING ON: \n\t\t localhost:3000");
    console.log(new Array(51).join("*")); 
  });
});