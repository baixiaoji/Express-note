var Sequelize = require('sequelize')
var path = require("path")
var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
});

//  定义数据表
var Note = sequelize.define('note', {
     id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    text: {
        type: Sequelize.STRING
    },
    uid:{
        type:Sequelize.INTEGER
    },
    username:{
        type:Sequelize.STRING
    },
    createdAt:{
        type:Sequelize.STRING
    }
});
//清空数据和重建数据库
// Note.sync({force:true})
// //  插入表格&查询
// Note.sync().then(function () {
//     // Table created
//      Note.create({
//         text: 'John',
//     });
// }).then(function () {
//     Note.findAll({raw:true}).then(function (notes) {
//         console.log(notes);
//     });
// });
Note.findAll({raw:true}).then(function (notes) {
    console.log(notes);
});

module.exports.Note = Note;
