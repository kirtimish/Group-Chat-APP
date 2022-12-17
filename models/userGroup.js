const Sequelize = require('sequelize')
const sequelize = require('../util/database')

const Usergroup = sequelize.define('usergroup', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
        allowNull: false
    }
})

module.exports = Usergroup;