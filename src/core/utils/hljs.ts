import hljs from 'highlight.js/lib/core'
import css from 'highlight.js/lib/languages/css'
import ini from 'highlight.js/lib/languages/ini'
import php from 'highlight.js/lib/languages/php'
import sql from 'highlight.js/lib/languages/sql'
import xml from 'highlight.js/lib/languages/xml'
import yaml from 'highlight.js/lib/languages/yaml'
import http from 'highlight.js/lib/languages/http'
import bash from 'highlight.js/lib/languages/bash'
import json from 'highlight.js/lib/languages/json'
import rust from 'highlight.js/lib/languages/rust'
import scss from 'highlight.js/lib/languages/scss'
import markdown from 'highlight.js/lib/languages/markdown'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'

hljs.registerLanguage('css', css)
hljs.registerLanguage('ini', ini)
hljs.registerLanguage('php', php)
hljs.registerLanguage('sql', sql)
hljs.registerLanguage('xml', xml)
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('http', http)
hljs.registerLanguage('bash', bash)
hljs.registerLanguage('json', json)
hljs.registerLanguage('rust', rust)
hljs.registerLanguage('scss', scss)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('typescript', typescript)

export type Language =
  | 'css'
  | 'ini'
  | 'php'
  | 'sql'
  | 'xml'
  | 'yaml'
  | 'http'
  | 'bash'
  | 'json'
  | 'rust'
  | 'scss'
  | 'markdown'
  | 'javascript'
  | 'typescript'

export const supportedLanguages = [
  'bash',
  'css',
  'http',
  'ini',
  'javascript',
  'json',
  'markdown',
  'php',
  'rust',
  'scss',
  'sql',
  'typescript',
  'xml',
  'yaml',
]

export function highlighter(value: string, language: Language) {
  return hljs.highlight(value, {
    language,
  }).value
}
