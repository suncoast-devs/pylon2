/** @type { import('prettier').Config} */
const config = {
  useTabs: false,
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  printWidth: 120,
  plugins: ['prettier-plugin-svelte', 'prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
  pluginSearchDirs: ['.'],
  overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }],
  tailwindConfig: './tailwind.config.cjs',
}

module.exports = config
