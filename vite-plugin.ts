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

  return {
    name: 'vite-plugin-partial-encrypt',

    // 转换文件内容
    transform(code, id) {
      // 只处理 .ts 和 .js 文件
      if (!/\.(js|ts)$/.test(id)) return

      // 正则匹配加密区块
      const regex = new RegExp(`${markers.markerStart}([\\s\\S]*?)${markers.markerEnd}`, 'g')

      let transformedCode = code
      let hasReplaced = false

      transformedCode = transformedCode.replace(regex, (match, p1) => {
        hasReplaced = true

        // AES 加密内容
        const encrypted = CryptoJS.AES.encrypt(p1.trim(), secretKey).toString()

        // 返回替换后的内容（保留标记结构）
        return `${markers.markerStart}\n'${encrypted}'${markers.markerEnd}`
      })

      // 返回修改后的代码（仅在发生替换时）
      return hasReplaced ? { code: transformedCode } : null
    }
  }
}
