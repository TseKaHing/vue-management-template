
var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
var email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
var tel = /^1[345789]\d{9}$/
var fax = /^(\d{3,4}-)?\d{7,8}$/
var username = /^(\w){5,16}$/
var currentpwd = /^(\w){5,25}$/
var newpwd = /^(\w){5,25}$/
var nickname = /^[\w\u4e00-\u9fa5]{2,12}$/



var FormValidate = (function () {
  function FormValidate() { }
  // From表单验证规则  可用于公用的校验部分
  FormValidate.Form = function () {
    return {
      // 姓名的验证规则
      Email: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('邮箱不能为空'))
        }
        if (!email.test(value)) {
          callback(new Error('请输入正确的邮箱!'))
        } else {
          callback()
        }
      },
      // 身份证的验证规则
      ID: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('身份证不能为空'))
        }
        if (!regId.test(value)) {
          callback(new Error('请输入正确的二代身份证号码'))
        } else {
          callback()
        }
      },
      // 电话号码的验证
      Tel: (rule, value, callback) => {
        console.log(value)
        if (!value) {
          return callback(new Error('电话不能为空'))
        }
        if (!tel.test(value)) {
          callback(new Error('请正确填写电话号码'))
        } else {
          callback()
        }
      },
      // 传真的校验规则
      Fax: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('传真不能为空'))
        }
        if (!fax.test(value)) {
          return callback(new Error('请正确填写传真'))
        }

        else {
          callback()
        }
      }
    }
  }

  FormValidate.Form_Login = function () {
    return {
      UserName: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('用户名不能为空'))
        }
        if (!username.test(value)) {
          callback(new Error('只能输入5-16个字母、数字、下划线'))
        }
        else callback()
      },
      Pwd: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!currentpwd.test(value)) {
          return callback(new Error('只能输入5-25个字母、数字、下划线'))
        }
        else callback()
      }
    }
  }
  FormValidate.Form_ChangePassword = function () {
    return {
      // 当前密码的验证
      CurrentPwd: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!currentpwd.test(value)) {
          callback(new Error('只能输入5-25个字母、数字、下划线'))
        }
        else callback()
      },
      NewPwd: function (rule, value, callback) {
        newpwdCompared = value
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!newpwd.test(value)) {
          callback(new Error('只能输入5-25个字母、数字、下划线'))
        }
        else callback()
      },
      ConfirmNewPwd: function (rule, value, callback) {

        console.log(newpwdCompared);
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!newpwd.test(value)) {
          return callback(new Error('只能输入5-25个字母、数字、下划线'))
        }
        if (value != newpwdCompared) {
          return callback(new Error('两次输入的新密码不一致，请重新输入'))

        }
        else callback()
      }
    }
  }

  // FromOne表单验证规则  用于FromOne个性化的校验
  FormValidate.Form_ResetPassword = function () {
    return {
      // 姓名的验证规则
      Name: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('姓名不能为空'))
        }
        if (!isNaN(value)) {
          callback(new Error('请输入正确姓名!'))
        } else if (value.length < 2 || value.length > 6) {
          callback(new Error('请输入2到6个字符!'))
        } else {
          callback()
        }
      }

    }
  }


  FormValidate.settingInfo = function () {
    return {
      // 姓名的验证规则
      NickName: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('昵称不能为空！'))
        }

        if (!nickname.test(value)) {
          return callback(new Error('请输入1到6个汉字或2~12个字母、数字、下划线'))
        }
        else callback()
      },

      Introduction: (rule, value, callback) => {
        if (!value) {
          return callback(new Error('简介不能为空！'))
        }

        if (value.length > 50) {
          return callback(new Error('输入内容保持在50字以内！'))
        }
        else callback()
      }

    }
  }


  return FormValidate
}())

exports.FormValidate = FormValidate
