import { defineConfig, Plugin } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'
import fs from 'fs'

// Plugin to handle base64 encoded image files
function base64ImagePlugin(): Plugin {
  return {
    name: 'base64-image-plugin',
    transform(code, id) {
      // Check if the file is in the assets folder and has an image extension
      if (id.includes('/assets/') && /\.(png|jpg|jpeg|gif|webp)$/.test(id)) {
        try {
          // Read the file content
          const content = fs.readFileSync(id, 'utf-8').trim()
          
          // Check if it's base64 encoded (starts with typical base64 PNG header)
          if (content.startsWith('iVBOR') || content.startsWith('/9j/') || content.startsWith('R0lGOD')) {
            // Determine the image type from extension
            const ext = path.extname(id).slice(1)
            const mimeType = `image/${ext === 'jpg' ? 'jpeg' : ext}`
            
            // Return as data URL
            const dataUrl = `data:${mimeType};base64,${content}`
            return {
              code: `export default "${dataUrl}"`,
              map: null
            }
          }
        } catch (e) {
          // If reading fails, let Vite handle it normally
        }
      }
      return null
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), base64ImagePlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
