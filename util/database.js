const Sequelize = require('sequelize');

const sequelize = new Sequelize('group_chat', 'root', 'kirtimish.8383', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize;