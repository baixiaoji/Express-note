var Sequelize = require('sequelize')
var path = require("path")
var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: path.join(__dirname,'../database/database.sqlite')
});

//  定义数据表
var User = sequelize.define('user', {
    //  id: {
    //     type: Sequelize.INTEGER,
    //     autoIncrement: true,
    //     primaryKey: true
    // },
    id:{
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username:{
        type:Sequelize.STRING
    },
    role:{
        type:Sequelize.INTEGER,
        defaultValue:0
    },
    password:{
        type:Sequelize.STRING
    }
});
// 建立链接
// sequelize
// .authenticate()
// .then(() => {
//   console.log('Connection has been established successfully.');
// })
// .catch(err => {
//   console.error('Unable to connect to the database:', err);
// });
//清空数据和重建数据库
// Note.sync({force:true})
// //  插入表格&查询
// User.sync().then(function () {
//     // Table created
//     User.create({
//         username: 'baiji',
//         password:'1041874421',
//         role:1
//     });
// }).then(function () {
//     User.findAll({raw:true}).then(function (users) {
//         console.log(users);
//     });
// });
User.findAll({raw:true}).then(function (users) {
            console.log(users);
        });

module.exports.User = User;
