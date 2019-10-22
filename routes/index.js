var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const authorModel = require('../model/Person');
const booksModel = require('../model/Story');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/1', function(req, res, next) {
    console.log(req.body);
    const{authorName}=req.body;
    const AuthorModel = new authorModel({
      name: authorName
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
  const{bookTitle}=req.body;
  const BookModel= new booksModel({
    title:bookTitle
  });
  BookModel.save()
      .then(data => {
        console.log(data+'SAVE_BOOK');
        res.send('ok');
      })
      .catch((err) => console.log(err));
});

router.post('/3', async function(req, res, next) {
  console.log(req.body);
    const{ bookTitle,authorName }=req.body;
    let a = await authorModel.findOne({name: authorName});
    let b = await booksModel.findOne({title: bookTitle});
    let d = await Promise.all([a,b])
        .then(data=>{
            data[0].stories=data[1]._id;
            data[1].author=data[0]._id;

            return data;
        }).then(data=>{
          return data
        }) .catch(err=>console.log(err));
    console.log(d);
     // let h = await booksModel.findOne({title: bookTitle})
     //    .populate('author')
     //    .exec()
     //    .then(data=>console.log(data))
     //    .catch(err=>console.log(err));

    res.send('ok');

});

module.exports = router;


