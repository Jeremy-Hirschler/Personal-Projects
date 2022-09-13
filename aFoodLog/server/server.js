const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');
const cookieParser = require('cookie-parser');

app.use(express.json(), express.urlencoded({extended: true}));
app.use(cors({credentials: true,
    origin: 'http://localhost:3000'
    })
);
app.use(cookieParser())

require('./config/mongoose.config');
require('./routes/day.routes')(app);
require('./routes/user.routes')(app);

app.listen(PORT, ()=> {
    console.log(`Listening on PORT ${PORT}`);
})