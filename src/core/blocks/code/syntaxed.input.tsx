import styles from './syntaxed.input.module.scss'
import {
  useRef,
  useState,
  useEffect,
  FocusEventHandler,
  ChangeEventHandler,
  KeyboardEventHandler,
} from 'react'
import autosize from 'autosize'
import { Language, highlighter, supportedLanguages } from '../../utils/hljs'

type Props = {
  id: string
  rows?: number
  value: string
  filename: string
  language: Language
  placeholder: string
  onBlur: FocusEventHandler<HTMLTextAreaElement>
  onFocus: FocusEventHandler<HTMLTextAreaElement>
  onKeyUp: KeyboardEventHandler<HTMLTextAreaElement>
  onKeyDown: KeyboardEventHandler<HTMLTextAreaElement>
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  onFilenameChange: (filename: string) => void
  onLanguageChange: (language: Language) => void
}

function SyntaxedInput({
  id,
  rows = 1,
  value = '',
  onChange,
  onBlur,
  onFocus,
  onKeyUp,
  onKeyDown,
  filename,
  onFilenameChange,
  language = 'typescript',
  onLanguageChange,
  placeholder = '',
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [hljsValue, setHljsValue] = useState('')
  const [textareaHeight, setTextareaHeight] = useState<number | undefined>()

  useEffect(() => {
    const markdownTextAreaEl = textareaRef.current
    if (markdownTextAreaEl) {
      autosize(markdownTextAreaEl)
      return () => {
        autosize.destroy(markdownTextAreaEl)
      }
    }
  }, [])

  useEffect(() => {
    setHljsValue(highlighter(value, language))
    setTextareaHeight(textareaRef.current?.scrollHeight)
  }, [value, language])

  return (
    <>
      <div className={styles.header}>
        <input
          type="text"
          placeholder="filename"
          value={filename}
          onChange={({ target: { value } }) => onFilenameChange(value)}
        />
        <select
          value={language}
          onChange={(e) => {
            onLanguageChange(e.target.value as Language)
          }}
        >
          {supportedLanguages.map((lang) => (
            <option key={lang}>{lang}</option>
          ))}
        </select>
      </div>
      <div style={{ height: textareaHeight }} className={styles.wrapper}>
        <textarea
          ref={textareaRef}
          rows={rows}
          data-id={id}
          value={value}
          onKeyUp={onKeyUp}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
          onFocus={onFocus}
          onChange={onChange}
          className={styles.textarea}
          placeholder={placeholder}
          autoComplete="off"
        />
        <pre className={`hljs ${styles.pre}`} aria-hidden="true">
          <code
            className="cstps-codeblock"
            dangerouslySetInnerHTML={{ __html: hljsValue }}
          />
        </pre>
      </div>
    </>
  )
}

export default SyntaxedInput
