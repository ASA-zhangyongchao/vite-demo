/*
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-20 01:40:57
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-20 02:31:09
 * @FilePath: /vite-demo/src/data/index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// src/secret-data.ts
// @encrypt
const sensitiveConfig = {
  apiKey: 'a1b2c3d4e5',
  dbConnection: {
    host: '127.0.0.1',
    user: 'admin',
    password: 'p@ssw0rd'
  }
}
// @end

// 公共配置（不会被加密）
export const publicConfig = {
  appName: 'Secure App'
}

export default sensitiveConfig
