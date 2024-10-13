import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost', // tên host bạn muốn, có thể là 'localhost' hoặc '0.0.0.0' nếu bạn muốn truy cập từ các thiết bị khác trong mạng nội bộ.
    port: 5173        // port tùy chỉnh
  }
})
