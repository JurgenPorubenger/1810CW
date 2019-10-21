var express = require('express');
var router = express.Router();
const authorModel = require('../model/Person');
const booksModel = require('../model/Story');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/1', function(req, res, next) {
    console.log(req.body);
    const{author}=req.body;
    const AuthorModel = new authorModel({
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

router.post('/3', async function(req, res, next) {
  // console.log(req.body);
    const{ book,author }=req.body;
    let a = await authorModel.findOne({name: author})
        .then(data => data)
        .catch(err=>console.log(err));
    let b = await booksModel.findOne({title: book})
        .then(data => data)
        .catch(err=>console.log(err));
    a.stories=b._id;
    b.author=a._id;
    booksModel.findOne({title: book})
        .populate('author')
        .exec()
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
    // console.log(a+'ssss');
    // console.log(b+'ppppp');
    res.send('ok');

});

module.exports = router;
