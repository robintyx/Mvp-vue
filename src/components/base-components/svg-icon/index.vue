<template>
  <svg class="svg-class" :style="{ fontSize: size + 'px', color: color }" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: '',
    },
    size: {
      type: Number,
      default: 16,
    },
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
  },
}
</script>
<style scoped>
.svg-class {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  outline: 0;
}
</style>
