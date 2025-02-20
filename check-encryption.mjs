/*
 * @Author: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @Date: 2025-02-20 03:50:08
 * @LastEditors: 张永超 162996163+ASA-zhangyongchao@users.noreply.github.com
 * @LastEditTime: 2025-02-20 05:17:49
 * @FilePath: /vite-demo/check-encryption.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import CryptoJS from 'crypto-js'

// 验证函数
function validate(encrypted, key) {
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, key)
    const decrypted = bytes.toString(CryptoJS.enc.Utf8)

    if (!decrypted) {
      console.log('❌ 解密失败：空内容')
      return false
    }

    const { data, checksum } = JSON.parse(decrypted)
    const currentChecksum = CryptoJS.SHA256(data + key).toString()

    return currentChecksum === checksum
  } catch (error) {
    console.log('❌ 发生异常:', error.message)
    return false
  }
}

// 测试用例
const testCases = [
  {
    encrypted:
      'U2FsdGVkX1/SvZDt+7LfIwS4/TvftI4fFQqJZZXSz2y5R4DghxIYaPyxADARjdWcGqagbi9foVSZ7r+UNPgMr9xfYHbyVaikoh5z+vgmDeZxe6FOgbD2tJZ2STwJuKcTQ9lzYZamzBfaE8pTbWA1jhdRAwyXWIIVvKmMCvLiryckjaAo8PK+0Zy1N9J5p3ICqY6AIScWZXi9IUIOO8RV+SuZgZd3s8PVy/ufWtrP+b28hbKVmitux/mK7tCwZAf1+cYmV5E5T4FLt7FX6+ghVY8Q2gZErIxGTXDYhBjs7r9SxTTc5XJsbmwPGbgt4Ldw', // 有效加密数据（示例）
    key: 'my_secret_key',
    expected: true
  },
  {
    encrypted: 'InvalidEncryptedString', // 无效数据
    key: 'wrong_key',
    expected: false
  }
]

// 运行测试
function runTests() {
  testCases.forEach((tc, index) => {
    const result = validate(tc.encrypted, tc.key)
    console.log(`\n测试用例 ${index + 1}:`)
    console.log(`输入密钥: ${tc.key}`)
    console.log(`预期结果: ${tc.expected}`)
    console.log(`实际结果: ${result}`)
    console.log(result === tc.expected ? '✅ 通过' : '❌ 失败')
    if (index + 1 >= testCases.length) return
      console.log(
        `
----------------分割----------------
`
      )
  })
}

runTests()
