<template>
  <div icon="log-in" :bordered="false" :dis-hover="true" class="card-style">
    <div class="logo">
      <img class="logo-img" src="../../assets/images/TBDS.png" />
    </div>
    <div class="card-head"></div>
    <div class="register-circle-head"></div>
    <Form
      ref="RegisterForm"
      :model="RegisterForm"
      :rules="rule_RegisterForm"
      class="form-class"
      @keydown.enter.native="register_submit('RegisterForm')"
    >
      <FormItem prop="email">
        <i-input v-model="RegisterForm.email" placeholder="请输入邮箱">
          <span slot="prepend">
            <Icon :size="20" type="md-at" />
          </span>
        </i-input>
      </FormItem>
      <FormItem prop="passInfo">
        <i-input v-model="RegisterForm.passInfo" placeholder="请输入验证信息">
          <span slot="prepend">
            <Icon :size="20" type="ios-mail" />
          </span>
        </i-input>
        <p class="emailTips" v-if="show">验证信息已发送至邮箱，请注意查收！</p>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          @click.native.prevent="getPassinfo('RegisterForm.email')"
          :class="{disabled: !clickable}"
          long
        >{{Tips}}</Button>
        <Button
          class="submit"
          type="primary"
          @click.native.prevent="register_submit('RegisterForm')"
          long
        >提交验证</Button>
      </FormItem>
    </Form>
    <div class="loginTips">
      已经拥有账号？
      <router-link to="login" class="reg">账号登陆</router-link>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";
import "./RegLogin.less";

export default {
  name: "Register-form",
  data() {
    return {
      show: false,
      clickable: true,
      time: "60",
      Tips: "获取验证信息",
      RegisterForm: {
        email: "",
        passInfo: ""
      },
      rule_RegisterForm: {}
    };
  },
  methods: {
    getPassinfo(email) {
      if (!this.clickable) {
        return;
      }
      this.show = true;
      this.clickable = !this.clickable;
      this.Tips = this.time + "s后重新发送";
      let clock = window.setInterval(() => {
        this.time--;
        this.Tips = this.time + "s后重新发送";
        if (this.time < 0) {
          this.clickable = true;
          this.Tips = "重新发送验证信息";
          this.time = 60;
          window.clearInterval(clock);
        }
      }, 1000);
    },
    register_submit(form_data) {}
  }
};
</script>