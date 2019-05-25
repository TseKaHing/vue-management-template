<template>
  <div>
    <son v-model="inputValue"></son>
    <p>{{ inputValue }}</p>
  </div>
</template>

<script>
import son from './son'
export default {
  data() {
    return {
      inputValue: '',
    }
  },
  components: {
    son
  },
  methods: {
    handleInput(val) {
      this.inputValue = val
    } 
  }
}
</script>

<style>

</style>
