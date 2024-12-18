import { cn, langs } from '@/lib'
import { useMarkdowner } from '@/core'
import { CodeSyntax } from './CodeSyntax'
import { AutosizeTextarea } from '@/components'
import { memo, useCallback, useState } from 'react'
import { Code, Lang, MarkdownerAction } from '@/types'

type Props = {
  value: Code
  dispatch(action: MarkdownerAction): void
}

export const CodeInput = memo(function CodeInput({ value, dispatch }: Props) {
  const [ready, setReady] = useState(false)
  const [height, setHeight] = useState<string>('auto')
  const { ref, handleBlur, handleFocus, handleKeyDown } = useMarkdowner(
    value,
    dispatch,
  )

  return (
    <>
      <div className="code-header">
        <input
          id={`filename-${value.id}`}
          type="text"
          placeholder="filename"
          value={value.filename}
          onChange={(e) => {
            const block = { ...value, filename: e.currentTarget.value }
            dispatch({
              type: 'UPDATE_BLOCK',
              payload: { block },
            })
          }}
        />
        <div className="select-wrapper">
          <select
            id={`lang-${value.id}`}
            value={value.lang}
            onChange={(e) => {
              const block = { ...value, lang: e.currentTarget.value as Lang }
              dispatch({
                type: 'UPDATE_BLOCK',
                payload: { block },
              })
            }}
          >
            {langs.map((lang) => (
              <option key={lang}>{lang}</option>
            ))}
          </select>
        </div>
      </div>
      <div
        className={cn('code-input', ready ? '--initialized' : '')}
        style={{ height }}
      >
        <AutosizeTextarea
          id={`code-${value.id}`}
          ref={ref}
          value={value.text}
          spellCheck="false"
          onChange={(e) => {
            const block = { ...value, text: e.currentTarget.value }
            dispatch({
              type: 'UPDATE_BLOCK',
              payload: { block },
            })
          }}
          onBlur={handleBlur}
          onFocus={handleFocus}
          setHeight={setHeight}
          onKeyDown={handleKeyDown}
          placeholder="Code"
        />
        <CodeSyntax
          value={value}
          height={height}
          setReady={useCallback(() => {
            setReady(true)
          }, [])}
        />
      </div>
    </>
  )
})
