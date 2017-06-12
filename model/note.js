var Sequelize = require('sequelize')

var sequelize = new Sequelize(undefined, undefined, undefined, {
    host: 'localhost',
    dialect: 'sqlite',
    // SQLite only
    storage: '../database/database.sqlite'
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
    }
});
//  插入表格&查询
Note.sync().then(function () {
    // Table created
     Note.create({
        text: 'John',
    });
}).then(function () {
    Note.findAll({raw:true}).then(function (notes) {
        console.log(notes);
    });
});

