const mongoose = require('mongoose');
const  Schema = mongoose.Schema;


const storySchema = Schema({
        author: [{ type: Schema.Types.ObjectId, ref: 'PersonSchema' }],
        title: String,
        fans: [{ type: Schema.Types.ObjectId, ref: 'PersonSchema' }]
});


const Story = mongoose.model('StorySchema', storySchema);
module.exports = Story;