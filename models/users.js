const Sequelize = require('sequelize')
const SQL = new Sequelize('sqlite:./db.sqlite', {
    logging: false
})

module.exports = SQL.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: Sequelize.TEXT
    },
    online: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
})