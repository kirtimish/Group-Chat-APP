const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const sequelize = require('./util/database');

const User = require('./models/user')

const app = express();

const userRoutes = require('./routes/user');

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes);


sequelize
.sync()
.then(result => {
    app.listen('3000',() => {
        console.log('Server listening on PORT 3000');
    })
})
.catch(err => {
    console.log(err)
})