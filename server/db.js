/*Schema、Model、Entity或者Documents的关系请牢记，
Schema生成Model，Model创造Entity，
Model和Entity都可对数据库操作造成影响
，但Model比Entity更具操作性。*/

const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
mongoose.connect('mongodb://localhost:27017/Users', {
  useNewUrlParser: true,
  useCreateIndex: true
});

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/
const UserSchema = mongoose.Schema({
  username: { type: String, unique: true },
  password: {
    type: String, set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  }
});

/************** 定义模型Model **************/
const Models = {
  User: mongoose.model('User', UserSchema)
}

module.exports = Models;
