const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const storySchema = Schema({
        title: String,
        author: [{ type: Schema.Types.ObjectId, ref: 'Person' }],
});


const Story = mongoose.model('Story', storySchema);
module.exports = Story;