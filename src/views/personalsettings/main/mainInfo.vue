<template>
  <!-- 个人资料 -->
  <div class="personalCard">
    <!-- 背景图 -->
    <div class="backgroundPic">
      <Button
        icon="ios-image-outline"
        type="dashed"
        ghost
        style="position:relative;left:845px;top:15px;"
      >修改背景图片</Button>
    </div>

    <!-- 个人资料内容 -->
    <div class="personalCont">
      <Row>
        <i-col span="5">
          <div class="personalHead">
            <img style="border-radius:5px;" src="@/assets/img/头像.jpg" alt />
          </div>
        </i-col>

        <i-col span="19" style="padding:30px 0 20px 0;">
          <Form
            ref="settingInfo"
            :model="settingInfo"
            :rules="rule_settingInfo"
            :label-width="60"
            class="personalInfoForm"
          >
            <FormItem label="昵称" prop="NickName">
              <Input
                type="text"
                v-model="settingInfo.NickName"
                placeholder="请输入1到6个汉字或2~12个字母、数字、下划线"
              />
              {{ settingInfo.NickName }}
            </FormItem>
            <FormItem label="邮箱" prop="Email">
              <Input type="text" v-model="settingInfo.Email" placeholder="请输入正确得邮箱地址" />
            </FormItem>
            <FormItem label="性别" prop="Sex">
              <RadioGroup v-model="settingInfo.Sex">
                <Radio label="男">男</Radio>
                <Radio label="女">女</Radio>
                <Radio label="保密">保密</Radio>
              </RadioGroup>
            </FormItem>
            <FormItem label="公司" prop="Workplace" placeholder="描述内容请保持在50字以内!">
              <Input type="text" v-model="settingInfo.Workplace" />
            </FormItem>
            <FormItem label="城市" prop="LivingCity">
              <area-data></area-data>
            </FormItem>
            <FormItem label="简介" prop="Introduction">
              <Input
                v-model="settingInfo.Introduction"
                type="textarea"
                :autosize="{minRows: 2,maxRows: 5}"
                placeholder="简单的介绍自己，能更好的让别人认识你!(50字以内)"
                style="width:600px;"
              />
            </FormItem>
            <FormItem style="float:right;margin-right:130px;">
              <Button type="primary">提交</Button>
              <Button style="margin-left: 20px" @click.prevent="toMineInfo()">返回我的主页</Button>
            </FormItem>
          </Form>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
import "./mainInfo.less";
import AreaData from "_c/area-data";
import Format from "@/assets/js/Format.js";
export default {
  name: "PersonalSettings",
  data() {
    return {
      settingInfo: {
        NickName: "",
        Sex: "保密",
        Workplace: "北京理工大学珠海学院",
        Email: "878283824@qq.com",
        LivingCity: "广东深圳",
        Introduction: "初闻不识曲中意，再听已是曲中人。"
      },
      rule_settingInfo: {
        NickName: [
          {
            required: true,
            validator: Format.FormValidate.settingInfo().NickName,
            trigger: "blur"
          }
        ],
        Workplace: [
          {
            validator: Format.FormValidate.settingInfo().Introduction,
            trriger: blur
          }
        ],
        Sex: [
          {
            required: true
          }
        ],
        Email: [
          {
            required: true,
            validator: Format.FormValidate.Form().Email,
            trriger: blur
          }
        ],
        LivingCity: [
          {
            validator: Format.FormValidate.settingInfo().LivingCity,
            trriger: blur
          }
        ],
        Introduction: [
          {
            validator: Format.FormValidate.settingInfo().Introduction,
            trriger: blur
          }
        ]
      }
    };
  },
  components: {
    AreaData
  },
  methods: {
    toMineInfo() {
      this.$router.push({ name: "maininfo" });
    }
  }
};
</script> 

<style lang="less">
.padding-box {
  padding-top: 30px;
}
.font-padding {
  padding-left: 10px;
  vertical-align: middle;
}
.icon-padding {
  float: right;
  vertical-align: -webkit-baseline-middle;
  // padding-top: 14px;
  // line-height: 40px;
}
.div-padding {
  padding: 6px 6px;
  line-height: 1.1;
}
</style>
