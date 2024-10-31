import Sequelize from "sequelize";

const connection = new Sequelize({
    dialect: 'mysql',
    host: 'localhost',
    database: 'lojaroupa',
    username: 'root',
    password: '',
    timezone: '-03:00'
})
export default connection;