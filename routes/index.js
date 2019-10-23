var express = require('express');
var router = express.Router();
const AuthorModel = require('../model/Person');
const BooksModel = require('../model/Story');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/1', function(req, res, next) {
    console.log(req.body);
    const{author}=req.body;
    const authorModel = new AuthorModel({
      name: author
    });
    authorModel.save()
        .then(data => {
          console.log(data+'Save_Author');
          res.send('ok');
        })
        .catch((err) => console.log(err));
});

router.post('/2', function(req, res, next) {
  console.log(req.body);
  const{book}=req.body;
  const bookModel= new BooksModel({
    title:book
  });
  bookModel.save()
      .then(data => {
        console.log(data+'SAVE_BOOK');
        res.send('ok');
      })
      .catch((err) => console.log(err));
});

router.post('/3', async function(req, res, next) {
    const{ book,author } = req.body;
    let authorID = await AuthorModel.findOne({name: author})
        .catch(err=>console.log(err));
    let bookID = await BooksModel.findOne({title: book})
        .catch(err=>console.log(err));

    await BooksModel.findOneAndUpdate({title: book},{$push:{author: authorID._id}})
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
    await AuthorModel.findOneAndUpdate({name: author},{$push:{stories: bookID._id}})
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
        res.send('ok');

});

router.post('/4', async function(req, res, next) {
    try {
        const{ book,author } = req.body;
        let a = await AuthorModel.findOne({name: author})
            .populate('stories')
            .then(data => console.log(data))
            .catch(err=>console.log(err));
        // let bo = await BooksModel.findOne({title: book})
        //     .populate({path:'author'})
        //     .then(data => data)
        //     .catch(err=>console.log(err));
        await res.send(a);

    } catch(err) {
        console.log(err)
    }
});

module.exports = router;


// ,{new:true}