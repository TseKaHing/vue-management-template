<template>
  <Card dis-hover>
    <p slot="title">{{ $route.meta.title }}</p>
    <Form
      ref="Form_ResetPassword"
      :model="Form_ResetPassword"
      :rules="ruleForm_ResetPassword"
      :label-width="80"
    >
      <FormItem label="姓名" prop="name">
        <i-input type="text" v-model="Form_ResetPassword.name"></i-input>
      </FormItem>
      <FormItem label="身份证" prop="idCard">
        <i-input type="text" v-model="Form_ResetPassword.idCard"></i-input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('Form_ResetPassword')">提 交</Button>
        <Button @click="handleReset('Form_ResetPassword')" style="margin-left: 8px">重 置</Button>
      </FormItem>
    </Form>
  </Card>
</template>
<script>
import Format from "@/assets/js/Format.js";
export default {
  data() {
    return {
      Form_ResetPassword: {
        name: "",
        idCard: "",
        age: ""
      },
      ruleForm_ResetPassword: {
        name: [
          {
            validator: Format.FormValidate.Form_ResetPassword().Name,
            trigger: "blur"
          }
        ],
        idCard: [
          {
            validator: Format.FormValidate.Form_ResetPassword().Tel,
            trigger: "blur"
          }
        ]
      }
    };
  },

  mounted() {
    // console.log(Format.FormValidate.Form_ResetPassword().name);
  },

  methods: {
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success("Success!");
        } else {
          this.$Message.error("Fail!");
        }
      });
    },

    handleReset(name) {
      this.$refs[name].resetFields();
    }
  }
};
</script>

<style>
</style>
