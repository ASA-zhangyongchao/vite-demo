<!--
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-19 03:15:13
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-19 10:31:37
 * @FilePath: /vite-demo/src/views/AboutView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="flex-column items-center justify-center">
    <h1>This is an about page</h1>
    <div class="z-width-per-100 flex-row z-m-t-10 justify-center items-center">
      <el-button round>测试按钮</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

</script>


<style scoped lang="scss">
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
  }
}
</style>
