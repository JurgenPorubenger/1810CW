const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const editionSchema = Schema({
    title: String,
    author: [{
                type: Schema.Types.ObjectId,
                ref: 'PersonSchema',
            }],
    stories: [{
            type: Schema.Types.ObjectId,
            ref: 'StorySchema',
        }]
});


const Edition = mongoose.model('EditionSchema', editionSchema);
module.exports = Edition;