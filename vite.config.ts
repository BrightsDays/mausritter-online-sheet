import vue from '@vitejs/plugin-vue'

export default {
  base: 'mausritter-online-sheet',
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
