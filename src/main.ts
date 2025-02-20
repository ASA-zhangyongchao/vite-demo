/*
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-19 03:15:13
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-19 09:53:41
 * @FilePath: /vite-demo/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import '@/styles/index.scss'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
