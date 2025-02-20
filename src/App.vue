<!--
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-19 03:15:13
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-20 05:22:27
 * @FilePath: /vite-demo/src/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import CryptoJS from 'crypto-js'
import sensitiveConfig from '@/data/index'

onMounted(async () => {
  console.log(import.meta.env.VITE_ENCRYPT_KEY, "VITE_ENCRYPT_KEY")
  console.log(sensitiveConfig, "---sensitiveConfig")
  // 处理加密数据
  // const encryptedString = sensitiveConfig.toString().match(/\/\/ @encrypt\n(.*?)\n\/\/ @end/s)?.[1];
  // if (!encryptedString) throw new Error('找不到加密数据');
  if (process.env.NODE_ENV !== 'production') return
  const rawData = decrypt(sensitiveConfig)
  console.log(rawData, "--rawData")
})
// 在加密前混淆数据
function obfuscate(data: string) {
  return data.split('').reverse().join('');
}
const decrypt = (encryptedStr: any) => {
  try {
    // 解密流程
    console.log(obfuscate(encryptedStr), "--encryptedStr1")
    console.log(encryptedStr, "--encryptedStr2")
    const bytes = CryptoJS.AES.decrypt(encryptedStr, import.meta.env.VITE_ENCRYPT_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    
    if (!decrypted) {
      throw new Error('解密失败：空内容或密钥错误');
    }

    // 解析校验数据
    const { data, checksum, timestamp } = JSON.parse(decrypted);
    
    // 时效检查（示例：有效期7天）
    const now = Date.now();
    if (now - timestamp > 604800000) {
      throw new Error('数据已过期');
    }

    // 完整性校验
    const currentChecksum = CryptoJS.SHA256(data + import.meta.env.VITE_ENCRYPT_KEY).toString();
    if (currentChecksum !== checksum) {
      throw new Error(`数据校验失败！服务端:${checksum} 客户端:${currentChecksum}`);
    }

    return JSON.parse(data);
  } catch (e) {
    console.error('[安全错误]', e);
    return null;
  }
};
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
