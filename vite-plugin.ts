// vite.plugin.ts
import type { Plugin } from 'vite'
import CryptoJS from 'crypto-js'

// 插件配置接口
interface EncryptPluginOptions {
  secretKey: any
  markerStart?: string
  markerEnd?: string
}

export default function encryptPlugin(options: EncryptPluginOptions): Plugin {
  // 默认标记配置
  const defaultMarkers = {
    markerStart: '// @encrypt',
    markerEnd: '// @end'
  }

  const { secretKey, ...markers } = {
    ...defaultMarkers,
    ...options
  }
  let actualKey: string
  return {
    name: 'vite-plugin-partial-encrypt',
    configResolved(config) {
      // 构建时验证密钥存在性
      if (!process.env.VITE_ENCRYPT_KEY) {
        throw new Error('VITE_ENCRYPT_KEY must be set in environment')
      }
      actualKey = process.env.VITE_ENCRYPT_KEY
    },
    // 转换文件内容
    transform(code, id) {
      const regex = new RegExp(`${markers.markerStart}([\\s\\S]*?)${markers.markerEnd}`, 'g')

      return code.replace(regex, (match, p1) => {
        const rawData = p1.trim()

        // 生成校验哈希
        const checksum = CryptoJS.SHA256(rawData + secretKey).toString()

        // 构建带校验的加密对象
        const payload = {
          data: rawData,
          checksum: checksum,
          timestamp: Date.now()
        }

        // 加密完整数据
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), secretKey).toString()

        // 返回安全格式
        return `${markers.markerStart}\n${JSON.stringify(encrypted)}${markers.markerEnd}`
      })
    }
  }
}
