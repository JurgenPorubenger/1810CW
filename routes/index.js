var express = require('express');
var router = express.Router();
const authorModel = require('../model/Autors');
const booksModel = require('../model/Books');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/1', function(req, res, next) {
    console.log(req.body);
    const{author}=req.body;
    const AuthorModel =new authorModel({
      name: author
    });
    AuthorModel.save()
        .then(data => {
          console.log(data+'Save_Author');
          res.send('ok');
        })
        .catch((err) => console.log(err));
});

router.post('/2', function(req, res, next) {
  console.log(req.body);
  const{book}=req.body;
  const BookModel= new booksModel({
    title:book
  });
  BookModel.save()
      .then(data => {
        console.log(data+'SAVE_BOOK');
        res.send('ok');
      })
      .catch((err) => console.log(err));
});

router.post('/3', function(req, res, next) {
  console.log(req.body);
  const{book,author}=req.body;
  authorModel.findOneAndUpdate({books:book}).then(data=>{
    console.log(data.books);
    res.send('ok');
  });
  booksModel.findOneAndUpdate({authors:author}).then(data=>{
    console.log(data.authors);
    res.send('ok');
  });
});

module.exports = router;
