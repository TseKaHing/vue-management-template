<template>
  <Card dis-hover>
    <p slot="title">{{ $route.meta.title }}</p>
    <Form
      ref="Form_ChangePassword"
      :model="Form_ChangePassword"
      :rules="rule_Form_ChangePassword"
      :label-width="100"
    >
      <FormItem label="当前密码" prop="currentPwd">
        <Input type="password" v-model="Form_ChangePassword.currentPwd" placeholder="请输入原密码" />
      </FormItem>
      <FormItem label="新密码" prop="newPwd">
        <Input type="password" v-model="Form_ChangePassword.newPwd" placeholder="请确认新密码" />
      </FormItem>
      <FormItem label="确认新密码" prop="confirmNewPwd">
        <Input type="password" v-model="Form_ChangePassword.confirmNewPwd" placeholder="请再次确认新密码" />
      </FormItem>
      <FormItem>
        <span style="fontSize:14px">
          忘记密码？你可以
          <router-link to="/settings/personalsettings/resetpwdbyemail">重置密码</router-link>
        </span>
        <br />
        <!-- <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button> -->
        <Button type="primary" @click="changePwd('Form_ChangePassword')" style="float:right">修改密码</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import Format from "@/assets/js/Format.js";
import { mapActions } from "vuex";
import { getUserId, getUserName } from "@/lib/util";
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
            validator: Format.FormValidate.Form_ChangePassword().CurrentPwd,
            trigger: "blur"
          }
        ],
        newPwd: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().NewPwd,
            trigger: "blur"
          }
        ],
        confirmNewPwd: [
          {
            required: true,
            validator: Format.FormValidate.Form_ChangePassword().ConfirmNewPwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapActions(["changepwd"]),
    changePwd(name) {
      console.log(this.$refs[name]);
      this.$refs[name].validate(isValid => {
        if (isValid) {
          const user_id = getUserId();
          console.log("user_id", user_id);
          // const username = getUserName()
          const currentPwd = this.Form_ChangePassword.currentPwd;
          const newPwd = this.Form_ChangePassword.newPwd;
          this.changepwd({
            user_id,
            currentPwd,
            newPwd
          })
            .then(() => {
              this.$router.push({ name: "pwdsuccess" });
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>
