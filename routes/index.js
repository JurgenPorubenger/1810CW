var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Authors = require('../model/Person');
const Story = require('../model/Story');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/1', function(req, res, next) {
    // console.log(req.body);
    const{authorName}=req.body;
    const author =new Authors({
      name: authorName,
    });
    author.save()
        .then(data => {
          console.log(data+'Save_Author');
          res.send('ok');
        })
        .catch((err) => console.log(err));
});

router.post('/2', function(req, res, next) {
  console.log(req.body);
  const{bookTitle}=req.body;
  const story = new Story({
    title:bookTitle,
  });
  story.save()
      .then(data => {
        console.log(data.author+'SAVE_STORY');
        res.send('ok');
      })
      .catch((err) => console.log(err));
});

router.post('/3', function(req, res, next) {
  const{bookTitle,authorName}=req.body;
  let a = Authors.find({name:authorName});
  let b = Story.find({title:bookTitle});
  Promise.all([a,b]).then(data=>{
    data[1][0].author=data[0][0]._id;
    data[0][0].stories=data[1][0]._id;
    return data;
    // data[0].populate('Book').exec(function (err, story) {
    //   if (err) return handleError(err);
    //   console.log('The author is %s', story);
    //   res.send('ok');
      // prints "The author is Ian Fleming"
    // });
  }).then(data=> {
    return data[0][0].populate('Story')
    console.log()
  });

    res.send('ok');
  // }).catch(err=>console.log(err));
  // booksModel.findOneAndUpdate({authors:author}).then(data=>{
  //   console.log(data.authors);
  // });
});

module.exports = router;
