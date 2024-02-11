import { Language } from '../../utils/hljs'

export interface Code {
  id: string
  type: 'code'
  text: string
  filename: string
  language: Language
}
