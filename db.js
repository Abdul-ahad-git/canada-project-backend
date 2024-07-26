const mongoose = require('mongoose')
const URI = 'mongodb+srv://yadav:yadav@cluster1.ymy0t.mongodb.net/canada-project?retryWrites=true&w=majority'

mongoose.connect(URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB');
});
module.exports = mongoose
