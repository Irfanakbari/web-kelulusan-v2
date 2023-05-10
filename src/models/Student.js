import connection from "@/config/connection.js";
import {DataTypes} from "sequelize";


const Student = connection.define('Student', {
    nisn : {
        type : DataTypes.STRING,
        allowNull : false,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    email : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    kelas : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    jurusan: {
        type : DataTypes.STRING,
        allowNull : true
    },
    status: {
        type : DataTypes.INTEGER,
        allowNull : true,
        defaultValue:0
    },
    isOpen: {
        type : DataTypes.INTEGER,
        allowNull : false,
        defaultValue:0
    },
    openDate: {
        type : DataTypes.DATE,
        allowNull:true
    },
    tgl_lahir:{
        type : DataTypes.DATEONLY,
        allowNull : true
    },
    kabupaten:{
        type : DataTypes.STRING,
        allowNull : true
    },
    provinsi:{
        type : DataTypes.STRING,
        allowNull : true
    }
},{
    tableName: 'Student',
    updatedAt: false,
    createdAt : false
})


export default Student;