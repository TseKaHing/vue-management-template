<template>
  <div>
    <section class="section-contanier" style="height: 300px;">
      <div class="section-overlay" style="opacity: 0.7;background-color: #222222;"></div>
      <div
        class="section-block"
        style="background: repeat rgb(34,34,34) 50% 50% /
    cover fixed;background-image: url('../../../assets/images/login-bg.jpg');"
      >
        <div style="position: relative;text-align: center;padding-top:
      4%;">
          <p style="font-size: 30px;">API 演示</p>
          <!-- <input
            [(ngModel)]="ip"
            autofocus
            nz-input
            style="width: 300px;background:
        rgba(240, 248, 255, 0);color: #fff;"
            placeholder="输入IP"
            nzSize="large"
          />
          <button
            [nzLoading]="isLoading"
            (click)="lookUp()"
            nz-button
            nzGhost
            style="height: 40px;margin-left: 4px;width: 80px;vertical-align: top;"
          >查询</button>-->
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style lang="" scoped>
</style>