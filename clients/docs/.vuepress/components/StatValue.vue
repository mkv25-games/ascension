<template>
  <div class="stat">
    <label>{{ label }}</label>
    <span class="value">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'stat-value',
  props: ['label']
}
</script>

<style scoped>
label::after {
  content: ':';
}
div.stat {
  display: flex;
  flex-wrap: wrap;
}
div.stat > label {
  flex: 2 4;
  word-wrap: none;
}
div.stat > span.value {
  flex: 3 8;
}
</style>