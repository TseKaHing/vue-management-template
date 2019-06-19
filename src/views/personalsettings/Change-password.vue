<template>
  <Form
    ref="Form_ChangePassword"
    :model="Form_ChangePassword"
    :rules="rule_Form_ChangePassword"
    :label-width="100"
  >
    <FormItem label="当前密码" prop="currentPwd">
      <Input type="password" v-model="Form_ChangePassword.currentPwd" placeholder="请输入原密码"/>
    </FormItem>
    <FormItem label="新密码" prop="newPwd">
      <Input v-model="Form_ChangePassword.newPwd" placeholder="请确认新密码"/>
    </FormItem>
    <FormItem label="确认新密码" prop="confirmNewPwd">
      <Input v-model="Form_ChangePassword.confirmNewPwd" placeholder="请再次确认新密码"/>
    </FormItem>
    <FormItem>
      <span style="fontSize:14px">
        忘记密码？你可以
        <router-link to="/login/main/personalsettings/resetpwdbyemail">重置密码</router-link>
      </span>
      <br>
      <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
      <Button type="primary" @click="changePwd('Form_ChangePassword')" style="float:right">修改密码</Button>
    </FormItem>
  </Form>
</template>
<script>
import http from "@/assets/js/http.js";
import Format from "@/assets/js/Format.js";
export default {
  data() {
    return {
      Form_ChangePassword: {
        currentPwd: "",
        newPwd: "",
        confirmNewPwd: ""
      },
      rule_Form_ChangePassword: {
        currentPwd: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().Pwd,
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().Pwd,
            trigger: "blur"
          }
        ],
        confirmNewPwd: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().Pwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    changePwd(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          const pwd_changed_params = {
            UserName: this.$store.state.user.UserName,
            currentPwd: this.Form_ChangePassword.currentPwd,
            newPwd: this.Form_ChangePassword.newPwd,
            confirmNewPwd: this.Form_ChangePassword.confirmNewPwd
          };
          this.$axios
            .post("/api/user/pwdchange", pwd_changed_params)
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    // handleSubmit(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.$Message.success("Success!");
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    // },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.getUserNameAndRememberKey();
  },
  mixins: [http, Format]
};
</script>
