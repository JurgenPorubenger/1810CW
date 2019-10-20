const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const authorSchema = new Schema({
        name: String,
        books: [{ type: Schema.Types.ObjectId, ref: 'Books' }]
});


const Model = mongoose.model('authorSchema', authorSchema);
module.exports = Model;