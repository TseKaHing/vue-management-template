<template>
  <div>
    <Input :value="value" @input="handleInput" />
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  methods: {
    handleInput(event) {
      const val = event.target.value
      this.$emit('wusihua',val)
    }
  }
}
</script>

<style>

</style>
