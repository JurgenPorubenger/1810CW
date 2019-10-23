var express = require('express');
var router = express.Router();
const AuthorModel = require('../model/Person');
const BooksModel = require('../model/Story');
const EditionModel = require('../model/Edition');

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
router.post('/3', function(req, res, next) {
  console.log(req.body);
  const{edition}=req.body;
  const editionModel= new EditionModel({
    title:edition
  });
    editionModel.save()
      .then(data => {
        console.log(data+'SAVE_EDITION');
        res.send('ok');
      })
      .catch((err) => console.log(err));
});

router.post('/4', async function(req, res, next) {
    const{ book,author,edition } = req.body;
    let authorData = await AuthorModel.findOne({name: author})
        .catch(err=>console.log(err));
    let bookData = await BooksModel.findOne({title: book})
        .catch(err=>console.log(err));
    let editionData = await EditionModel.findOne({title: edition})
        .catch(err=>console.log(err));

    await BooksModel.findOneAndUpdate({title: book},{$push:{author: authorData._id, edition: editionData._id}})
        .then(data=>console.log(data+'book resaved!'))
        .catch(err=>console.log(err));
    await AuthorModel.findOneAndUpdate({name: author},{$push:{stories: bookData._id}})
        .then(data=>console.log(data+'aurhor resaved!'))
        .catch(err=>console.log(err));
    await EditionModel.findOneAndUpdate({title: edition},{$push:{stories: bookData._id, author: authorData._id}})
        .then(data=>console.log(data))
        .catch(err=>console.log(err));
   await res.send('ok');

});

router.post('/5', async function(req, res, next) {
    try {
        const{ book,author, edition} = req.body;
        let a = await EditionModel.findOne({title: edition})
            .populate({path:'stories', populate:[{path:'stories'},{path:'author'}]})
            .then(data=>data)
            .catch(err=>console.log(err));
        // let bo = await BooksModel.findOne({title: book})
        //     .populate({path:'author'})
        //     .then(data => data)
        //     .catch(err=>console.log(err));
        console.log(a)
        await res.send('ok');

    } catch(err) {
        console.log(err)
    }
});

module.exports = router;


// ,{new:true}
//, populate:[{path:'author'}]
//, populate:{path:'author'}