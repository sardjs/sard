import * as pinyinPro from 'pinyin-pro'
import toUrlHandle from './toUrlHandle.js'

const { pinyin } = pinyinPro.default ?? pinyinPro

export default function genHash(code) {
  return code.replace(/<h([123])>(.*?)<\/h\1>/g, (_, g1, g2) => {
    const id = toUrlHandle(
      pinyin(g2, {
        toneType: 'none',
        nonZh: 'consecutive',
      }),
    )

    const anchor = `<a class="doc-anchor" href="#${id}">#</a>`

    return `<h${g1} id="${id}">${g2}${anchor}</h${g1}>`
  })
}
