const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cors({
    origin: 'http://localhost:3000'
    })
);

require('./config/mongoose.config');
require('./routes/day.routes')(app);

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`);
})