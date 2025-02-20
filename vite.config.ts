/*
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-19 03:15:13
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-20 03:21:20
 * @FilePath: /vite-demo/vite.config.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import encryptPlugin from './vite-plugin'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // 强制读取process.env（跳过Vite默认的.env文件加载）
  const env = {
    ...process.env,
    ...loadEnv(mode, process.cwd(), '')
  }
  return {
    plugins: [
      vue(),
      encryptPlugin({
        secretKey: env.VITE_ENCRYPT_KEY, // 从环境变量获取密钥
        markerStart: '// @encrypt', // 自定义起始标记
        markerEnd: '// @end' // 自定义结束标记
      }),
      vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ],
    base: process.env.NODE_ENV === 'production' ? '/vite-demo/' : '/',
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/styles/constant.scss";'
        }
      }
    }
  }
})
