import MarkdownIt from 'markdown-it'
import { normalizePath } from 'vite'
import path from 'node:path'
import esbuild from 'esbuild'
import {
  MD_DEMO_CODE_R,
  MD_DEMO_CODE_SEPARATOR,
  MD_PATH_R,
  ROOT_DIR,
} from '../utils/constants.js'
import { hlCallback } from '../utils/highlight.js'
import genHash from '../utils/genHash.js'

const renderStrategies = {
  markdown(code) {
    const html = code
      .replace(/`/g, '&#96;')
      .replace(/\f/g, '')
      .replace(/(?=<h[23])/g, '\f')
      .split('\f')
      .map((fragment) =>
        fragment.includes('<h3')
          ? `<div class="doc-card">${fragment}</div>`
          : fragment,
      )
      .join('')
      .split(/(?=<table)|(?<=<\/table>)/)
      .map((fragment) =>
        fragment.includes('<table')
          ? `<div class="doc-table-responsive">${fragment}</div>`
          : fragment,
      )
      .join('')

    return `<section className="doc-section" dangerouslySetInnerHTML={{ __html: \`${genHash(
      html,
    )}\` }}></section>`
  },

  demo(data) {
    return `<section className="doc-section">${data
      .map((demo) => {
        return `<Demo>{${demo.name}}</Demo>`
      })
      .join('\n')}</section>`
  },
}

function transform(code, id, md) {
  if (!MD_PATH_R.test(id)) {
    return
  }

  let demoUrls = []

  let demoId = 0

  const html_block = md.renderer.rules.html_block
  md.renderer.rules.html_block = (tokens, idx, options, env, self) => {
    const token = tokens[idx]
    const match = MD_DEMO_CODE_R.exec(token.content)
    if (match) {
      demoUrls.push(JSON.parse(match[1]))
      return MD_DEMO_CODE_SEPARATOR
    }
    return html_block(tokens, idx, options, env, self)
  }

  let html = md.render(code)

  const sections = html
    .split(MD_DEMO_CODE_SEPARATOR)
    .map((fragment, idx, { length }) => {
      const section = {
        type: 'markdown',
        data: fragment,
      }
      if (idx === length - 1) {
        return section
      }
      return [
        section,
        {
          type: 'demo',
          data: demoUrls[idx].map((url) => ({
            url: url,
            fullUrl: normalizePath(
              path.resolve(id, '..', url).replace(/\.\w+$/, ''),
            ),
            name: `Demo${++demoId}`,
            id: demoId,
          })),
        },
      ]
    })
    .flat()

  const content = `import React from 'react'
    import Demo from '${normalizePath(
      path.resolve(ROOT_DIR, './site/desktop/components/Demo'),
    )}'
    ${sections
      .filter((section) => section.type === 'demo')
      .map((section) => section.data)
      .flat()
      .map(
        (demo) =>
          `import ${demo.name}, { doc as doc${demo.id} } from '${demo.fullUrl}'\n` +
          `${demo.name}.doc = doc${demo.id}`,
      )
      .join('\n')}

    export default function Component() {
      return (
        <div className="doc-content">
          ${sections
            .map((section) => {
              return renderStrategies[section.type](section.data)
            })
            .join('\n')}
        </div>
      )
    }`

  const result = esbuild.transformSync(content, { loader: 'jsx' })

  return result.code
}

export function transformMarkdown() {
  const md = new MarkdownIt({
    html: true,
    highlight: hlCallback,
  })

  return {
    name: 'transformMarkdown',
    enforce: 'pre',
    transform(code, id) {
      return transform(code, id, md)
    },
  }
}
