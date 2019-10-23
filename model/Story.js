const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const storySchema = Schema({
    title: String,
    author: [{
                type: Schema.Types.ObjectId,
                ref: 'PersonSchema',
            }],
    edition: [{
                type: Schema.Types.ObjectId,
                ref: 'EditionSchema',
             }]
});


const Story = mongoose.model('StorySchema', storySchema);
module.exports = Story;