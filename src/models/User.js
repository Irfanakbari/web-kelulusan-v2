import connection from "@/config/connection.js";
import {DataTypes} from "sequelize";


const User = connection.define('User', {
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    createdAt : {
        type : DataTypes.DATE,
        allowNull : false,
    },
    role: {
        type : DataTypes.STRING,
        allowNull : true
    }
},{
    tableName: 'User',
    updatedAt: false,
    createdAt : 'createdAt'
})


export default User;