import {Sequelize} from "sequelize";
import mysql2 from 'mysql2'; // Needed to fix sequelize issues with WebPack


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    dialectModule: mysql2
});


export default sequelize;