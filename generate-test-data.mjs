/*
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-20 03:58:53
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-20 05:17:27
 * @FilePath: /vite-demo/generate-test-data.mjs
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// generate-test-data.mjs
import CryptoJS from "crypto-js";

// 生成有效加密数据
const secretKey = "my_secret_key";
const rawData = {
  apiKey: 'a1b2c3d4e5',
  dbConnection: {
    host: '127.0.0.1',
    user: 'admin',
    password: 'p@ssw0rd'
  }
}

// 1. 计算校验和
const checksum = CryptoJS.SHA256(rawData + secretKey).toString();

// 2. 构建加密载荷
const payload = {
  data: rawData,
  checksum: checksum,
  timestamp: Date.now(),
};

// 3. 加密数据
const encrypted = CryptoJS.AES.encrypt(
  JSON.stringify(payload),
  secretKey
).toString();

console.log("有效加密字符串：", encrypted);
