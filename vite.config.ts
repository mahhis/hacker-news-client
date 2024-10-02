import { defineConfig, Plugin } from 'vite'
import preact from '@preact/preset-vite'
import fs from 'fs'
import path from 'path'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    preact(),
    tsconfigPaths(),
  ],
  build: {
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }) as Plugin,
      ],
    },
    outDir: 'dist',
  },
  //server: {
    // https: {
    //   key: fs.readFileSync('/Users/mahhis/Downloads/fe1p.com/private.key'), // Your private key path
    //   cert: fs.readFileSync('/Users/mahhis/Downloads/fe1p.com/certificate.crt'), // Your certificate path
    //  ca: fs.readFileSync('/Users/mahhis/Downloads/fe1p.com/ca_bundle.crt'), // Your CA bundle path
    // },
    // host: '0.0.0.0', // Ensure server listens on all network interfaces
 // },
  server: {
    https: {
      key: fs.readFileSync('/etc/ssl/private/private.key'), // Your private key>
      cert: fs.readFileSync('/etc/ssl/certificate.crt'), // Your certificate pa>
      ca: fs.readFileSync('/etc/ssl/ca_bundle.crt'), // Your CA bundle path
      // key: fs.readFileSync(path.resolve(__dirname, '/etc/ssl/fe1p.com/private.key')),
      // cert: fs.readFileSync(path.resolve(__dirname, '/etc/ssl/fe1p.com/certificate.crt')),
      // ca: fs.readFileSync('/etc/ssl/fe1p.com/ca_bundle.crt'), // Your CA bundle path

    },  // Enable HTTPS
    host: '0.0.0.0', // Ensure Vite listens on all network interfaces
  },

})
