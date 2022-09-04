const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dailyLog-db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to Daily Log Database');
})
.catch((err) => {
    console.log('Could not connect to Daily Log Database', err);
})

