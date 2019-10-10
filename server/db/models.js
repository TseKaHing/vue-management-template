/*Schema、Model、Entity或者Documents的关系请牢记，
Schema生成Model，Model创造Entity，
Model和Entity都可对数据库操作造成影响
，但Model比Entity更具操作性。*/

const mongoose = require('mongoose');
// 连接数据库 如果不自己创建 默认test数据库会自动生成
// mongoose.connect('mongodb://localhost:27017/Users', {
//   useNewUrlParser: true,
//   useCreateIndex: true
// });

mongoose.connect('mongodb://localhost:27017/Users', {
  useNewUrlParser: true,
  useCreateIndex: true
});


// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error', () => console.log('Mongo connection error'));
db.once('open', () => console.log('Mongo connection successed'));
/************** 定义模式loginSchema **************/

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

const MenuListSchema = new Schema({
  degree: { type: Number, default: 0 },
  authenlist: { type: Array }
})


/************** 定义模型Model **************/


const Models = {}

Models.User = mongoose.model('User', UserSchema)
// Models.MenuList = mongoose.model('MenuList', MenuListSchema)



module.exports = Models;



// const authenlist = new Models.MenuList({
//   degree: 2,
//   authenlist: [
//     {
//       title: "首页",
//       name: "HomePge",
//       icon: "md-pie"
//     },
//     {
//       title: "上传资源",
//       name: "UploadResources",
//       icon: "ios-cloud-upload"
//     },
//     {
//       title: "系统设置",
//       name: "Settings",
//       icon: "ios-settings",
//       children: [
//         { title: "个人设置", name: "PersonalSettings", icon: "md-contact" },
//         {
//           title: "管理资源",
//           name: "ManageResources",
//           icon: "ios-folder-open",
//           children: [
//             {
//               title: "下载资源",
//               name: "DownloadedResources",
//               icon: "md-download"
//             },
//             { title: "垃圾桶", name: "dropbox", icon: "logo-dropbox" }
//           ]
//         }
//       ]
//     }
//   ]
// })

// authenlist.save(err => {
//   if (err) {
//     return
//   }
//   console.log('save success');
// })

