import { AliasOptions, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tscPlugin from 'vite-plugin-tsc'

import path from 'path'

const getAlias = (aliases: string[]): AliasOptions =>
  aliases.map((alias) => ({
    find: alias,
    replacement: path.resolve(__dirname, 'src', alias),
  }))

const alias: AliasOptions = getAlias([
  'components',
  'types',
  'assets',
  'pages',
  'api',
  'constants',
  'utils',
  'helpers',
  'state',
  'router',
  'interfaces',
])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tscPlugin()],
  resolve: {
    alias,
  },
})
