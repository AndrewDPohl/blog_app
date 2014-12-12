var express = require("express"),
  bodyParser = require("body-parser"),
  db = require("./models"),
  app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/authors", function (req, res) {
  db.author.findAll().then(function(authors){
    res.render("authors/index", {authorsList: authors});
  })
});

app.get("/posts", function (req, res) {
  db.post.findAll().then(function(posts){
    res.render("posts/index"), {postsList: posts};
  })
});

app.get("/authors/new", function (req, res) {
  res.render("authors/new");
});

app.get("/posts/new", function (req, res){ 
  res.render("posts/new");
});

//post a new author 
app.post("/authors", function (req, res) {
  db.author.create({
    firstName: req.body.author.firstName,
    lastName: req.body.author.lastName,
    age: req.body.author.age
  }).then(function(newAuthor){
    console.log(req.body.author);
    res.redirect("/authors");
  });
});

app.post("/posts",  function (req, res) {
  db.post.create({
    title: req.body.post.title,
    content: req.body.post.content
  }).then(function(newPost){
    console.log(req.body.post);
    res.redirect("/posts");
  });
});

app.get("/authors/:id", function(req, res) {
  var id = req.params.id;
  db.author.find({
    where: {id: id},
    include: [db.post]
  })
  .then(function(foundAuthor) {
    res.render("authors/show", {author: foundAuthor});
  });
});

app.get("/posts/:id", function(req, res) {
  var id = req.params.id;
  db.post.find({
    where: {id: id},
    include: [db.author]
  })
  .then(function(foundPost) {
    res.render("posts/show", {post: foundPost});
  });
});

app.get("/authors/:author_id/posts/new", function (req, res){
  var authorID = req.params.author_id;
  res.render("posts/new", {authorID: authorID});
});

app.post("/authors/:author_id/posts", function(req, res){
  var authorID = req.params.author_id;
  db.post.creat({
    title: req.body.post.title,
    content: req.body.post.content,
    authorID: authorID
  }).then(function(post){
    res.redirect("/authors/" + author_id + "/posts/" + post.id);
  })
});

app.get("/authors/:author_id/posts/:id", function(req, res){
  var authorId = req.params.author_id;
  var id = req.params.id;
  db.post.find(id)
  .then(function (foundPost) {
    if (foundPost.authorId === parseInt(authorId)) {
      res.render("posts/show", {post: foundPost});
    } else {
      res.redirect("/authors/" + authorId);
    }
  });
});


 db.sequelize.sync().then(function() {
    var server = app.listen(3000, function() {
    console.log(new Array(51).join("*"));
    console.log("\t LISTENING ON: \n\t\t localhost:3000");
    console.log(new Array(51).join("*")); 
  });
});