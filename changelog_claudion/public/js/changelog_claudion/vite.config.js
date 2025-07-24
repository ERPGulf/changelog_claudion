// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import path from 'path'

// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, 'changelog_app.js'),
//       name: 'ChangelogApp',
//       fileName: 'changelog_app'
//     },
//     outDir: '.',
//     rollupOptions: {
//       external: ['vue']
//     }
//   }
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'changelog_app.js'),
      name: 'ChangelogApp',
      fileName: 'changelog_app'
    },
    outDir: '.', // Overwrite in-place
    rollupOptions: {
      external: ['vue'] // Provided via CDN
    }
  }
})