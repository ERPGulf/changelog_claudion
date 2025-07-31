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
    outDir: '.',
    rollupOptions: {
      external: ['vue']
    }
  }
})

// import { defineConfig } from "vite";
// import vue from "@vitejs/plugin-vue";
// import path from "path";

// export default defineConfig({
//   plugins: [vue()],
//   build: {
//     lib: {
//       entry: path.resolve(__dirname, "changelog.js"),
//       name: "Changelog",
//       fileName: "changelog",
//     },
//     outDir: ".",
//     rollupOptions: {
//       external: ["vue"],
//     },
//   },
// });
