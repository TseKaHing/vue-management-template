<template>
  <div>
    <List :list="list" :render="renderFunc"></List>
  </div>
</template>

<script>
import List from './list'
export default {
  data() {
    return {
      list: [
        { name: 'Lison' },
        { name: 'Jazzy' }
      ]
    }
  },
  components: {
    List
  },
  methods: {
    renderFunc() {
      
    }
  }
}
</script>

<style>

</style>
