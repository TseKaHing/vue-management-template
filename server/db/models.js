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


// User = mongoose.model('User', UserSchema)
// Ips = mongoose.model('Ips', IpsSchema)
// Models.MenuList = mongoose.model('MenuList', MenuListSchema)


module.exports = Models




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

