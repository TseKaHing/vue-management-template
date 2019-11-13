/*Schema、Model、Entity或者Documents的关系请牢记，
Schema生成Model，Model创造Entity，
Model和Entity都可对数据库操作造成影响
，但Model比Entity更具操作性。*/

const mongoose = require('mongoose');
const Ips = require('./ips')
const User = require('./user')


mongoose.connect('mongodb://localhost:27017/Users', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));



/************** 定义模型Model **************/

var Models = {
  User,
  Ips
}

module.exports = Models