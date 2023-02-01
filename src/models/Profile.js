import connection from "@/config/connection.js";
import {DataTypes} from "sequelize";


const Profile = connection.define('Profile', {
    id : {
        type : DataTypes.INTEGER,
        allowNull : false,
        primaryKey : true
    },
    nama_sekolah : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    judul_web : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    button_label : {
        type : DataTypes.STRING,
        allowNull : true,
    },
    kepsek: {
        type : DataTypes.STRING,
        allowNull : true
    },
    isOpen: {
        type : DataTypes.INTEGER,
        allowNull : true
    },
    npsn :{
        type : DataTypes.STRING,
        allowNull : true
    }
},{
    tableName: 'Profile',
    updatedAt: false,
    createdAt : false
})


export default Profile;