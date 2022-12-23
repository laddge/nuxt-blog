<template>
  <div :class="'note border-start border-2 border-' + color + ' bg-' + color + '-light ms-2 mb-3 p-3'">
    <slot />
  </div>
</template>

<style scoped>
.note p:last-child {
  margin-bottom: 0;
}
</style>

<script>
export default {
  props: {
    color: {
      type: String,
      default: 'primary'
    }
  }
}
</script>
