const mongoose = require('mongoose');
var Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: {
    type: String, set(val) {
      // 10 指的是生成salt的迭代次数
      return require('bcrypt').hashSync(val, 10)
    }
  },
  token: { type: String },
  tokenFlag: { type: Boolean, default: true },
  degree: { type: Number, default: 0 }
});

User = mongoose.model('User', UserSchema)

module.exports = User