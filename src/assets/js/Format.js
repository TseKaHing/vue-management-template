
var regId = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
var email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
var tel = /^1[345789]\d{9}$/
var fax = /^(\d{3,4}-)?\d{7,8}$/
var username = /^(\w){5,16}$/
var pwd = /^(\w){5,25}$/




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
          callback(new Error('请正确填写传真'))
        } else {
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
        if (!pwd.test(value)) {
          callback(new Error('只能输入5-16个字母、数字、下划线'))
        }
        else callback()
      },
      Pwd: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!pwd.test(value)) {
          callback(new Error('只能输入5-25个字母、数字、下划线'))
        }
        else callback()
      }
    }
  }
  FormValidate.Form_ChangePassword = function () {
    return {
      // 当前密码的验证
      Pwd: function (rule, value, callback) {
        if (!value) {
          return callback(new Error('密码不能为空'))
        }
        if (!pwd.test(value)) {
          callback(new Error('只能输入5-25个字母、数字、下划线'))
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


  return FormValidate
}())

exports.FormValidate = FormValidate
