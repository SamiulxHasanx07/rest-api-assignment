const express = require('express');
const cors = require('cors');
require('dotenv').config();
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());
app.set("view engine", "ejs");


app.use('user', (req, res) => {
    console.log('Users');
});



app.all('/', (req, res) => {
    res.send('Server is running!!')
})
app.all('*', (req, res) => {
    res.send('Router is not found!')
})

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})