<template>
  <div>This is test page</div>
</template>

<script>
export default {
  created() {
    this.$store.dispatch('user/logout')
  }
}
</script>
