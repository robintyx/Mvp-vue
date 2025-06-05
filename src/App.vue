<template>
  <StyleProvider :transformers="[px2rem]" v-if="$config.pxtorem.open">
    <a-config-provider :locale="locale">
      <router-view />
    </a-config-provider>
  </StyleProvider>
  <a-config-provider :locale="locale" v-else>
    <router-view />
  </a-config-provider>
</template>

<script setup>
import { px2remTransformer, StyleProvider } from 'ant-design-vue'
const px2rem = px2remTransformer({
  rootValue: $config.pxtorem.baseSize,
})

import zhCN from 'ant-design-vue/es/locale/zh_CN'
const locale = zhCN
onMounted(() => {})
</script>
<style></style>
