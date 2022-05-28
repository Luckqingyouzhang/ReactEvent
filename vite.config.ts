import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    server: {
        proxy: {
            '^/item1': {
                target: 'http://www.liulongbin.top:3008',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/item1/, '')
            },
            '^/item2': {
                target: 'http://geek.itheima.net',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/item2/, '')
            }
        }
    }
})
