import { build } from 'vite'
import mergeViteConfig from '../utils/mergeViteConfig.js'

export async function buildSite() {
  await build(mergeViteConfig())
}
