const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5000;
const user = require('./user.json');
const app = express();

const userRoute = require('./routes/user.route.js');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.set("view engine", "ejs");


app.use('/user', userRoute)

app.all('/', (req, res) => {
    res.sendFile(__dirname + "/public/home.html");
})
app.all('*', (req, res) => {
    res.send('Router is not found!')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})