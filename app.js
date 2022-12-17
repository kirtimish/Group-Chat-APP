const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const cors = require('cors');
const sequelize = require('./util/database');

const User = require('./models/user')
const Chat = require('./models/chat')
const Group = require('./models/group')
const Usergroup = require('./models/userGroup')

const app = express();

const userRoutes = require('./routes/user');
const groupRoutes = require('./routes/group')
const messageRoutes = require('./routes/message')

app.use(cors({
    origin:'*',
    credentials:true
}));

app.use(bodyparser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user',userRoutes);
app.use('/message',messageRoutes);
app.use('/group', groupRoutes);

User.hasMany(Chat);
Chat.belongsTo(User);
Group.hasMany(Chat);
Chat.belongsTo(Group);
User.belongsToMany(Group, {through: Usergroup})
Group.belongsToMany(User, {through: Usergroup})

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