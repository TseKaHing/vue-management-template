
<template>
  <div icon="log-in" :bordered="false" :dis-hover="true" class="card-style">
    <div class="logo">
      <img class="logo-img" src="../../assets/images/TBDS.png" />
    </div>
    <div class="card-head"></div>
    <div class="circle-head"></div>

    <div class="loginform">
      <Form
        ref="LoginForm"
        :model="LoginForm"
        :rules="rule_LoginForm"
        class="form-class"
        @keydown.enter.native="login_submit('LoginForm')"
      >
        <FormItem prop="userName">
          <i-input v-model="LoginForm.userName" placeholder="请输入用户名">
            <span slot="prepend">
              <Icon :size="20" type="ios-person" />
            </span>
          </i-input>
        </FormItem>
        <FormItem prop="password">
          <i-input type="password" v-model="LoginForm.password" placeholder="请输入密码">
            <span slot="prepend">
              <Icon :size="20" type="md-lock" />
            </span>
          </i-input>
        </FormItem>
        <Checkbox v-model="checkFlag">
          <span class="rememberKey">记住密码</span>
        </Checkbox>
        <span>
          <a href class="forgetPwd">忘记密码？</a>
        </span>
        <br />
        <br />
        <FormItem>
          <!-- <Button type="primary" @click.native.prevent="register_submit('LoginForm')" long>注册</Button> -->
          <Button type="primary" @click.native.prevent="login_submit('LoginForm')" long>登录</Button>
        </FormItem>
      </Form>
      <div class="registerTips">
        尚未拥有账号？
        <router-link to="/register" class="reg">立即注册</router-link>
      </div>
      <div class="authorize-icon">
        <img src="../../../public/github.png" alt="github授权登录" @click="AuthenByGithub()" />
        <img src="../../../public/wechatLogo.jpg" alt />
      </div>
    </div>
  </div>
</template>
<script>
import Format from "@/assets/js/Format.js";
import { mapMutations, mapActions } from "vuex";
import { getUserName, getRawPwd, setRawPwd } from "@/lib/util";
import { getInfo } from "@/api/data.js";
import { authen_url } from "@/lib/authenByGithub";
export default {
  name: "Login-Form",
  data() {
    return {
      checkFlag: false,
      // loading 表示点击 登陆 按钮 的加载状态，初始化为 false
      systemName: "",
      prefix_url: "/api/user",
      LoginForm: {
        userName: getUserName() ? getUserName() : "",
        password: getRawPwd() ? getRawPwd() : ""
      },
      rule_LoginForm: {
        userName: [
          {
            required: true,
            validator: Format.FormValidate.Form_Login().UserName,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            validator: Format.FormValidate.Form_Login().Pwd,
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    ...mapMutations(["setCheckState"]),
    ...mapActions(["register", "login"]),
    // register_submit(name) {
    //   this.$refs[name].validate(isValid => {
    //     if (isValid) {
    //       this.register({
    //         username: this.LoginForm.userName,
    //         password: this.LoginForm.password
    //       })
    //         .then(() => {
    //           return;
    //         })
    //         .catch(err => {
    //           return;
    //         });
    //     }
    //   });
    // },
    login_submit(name) {
      this.$refs[name].validate(isValid => {
        if (isValid) {
          if (this.checkFlag) {
            setRawPwd(this.LoginForm.password);
          } else if (!this.checkFlag) {
            setRawPwd("");
          }

          this.login({
            username: this.LoginForm.userName,
            password: this.LoginForm.password
          })
            .then(res => {
              // if (this.checked) this.setCheckState(true);

              this.$router.push({ name: "home" });
              this.$Message.info("登陆成功！");
            })
            .catch(err => {
              console.log(err);
              // return;
            });
        }
      });
    },
    AuthenByGithub() {
      this.$router.push({ name: "authenbygithub" });
    }
  },
  mounted() {
    window.addEventListener("keyup", e => {
      if (e.keyCode === 13) {
        this.login_submit("LoginForm");
      }
    });
  }
};
</script>
