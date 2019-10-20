const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const bookSchema = new Schema({
        title: String,
        authors: [{ type: Schema.Types.ObjectId, ref: 'Authors' }]
});


const Model = mongoose.model('bookSchema', bookSchema);
module.exports = Model;