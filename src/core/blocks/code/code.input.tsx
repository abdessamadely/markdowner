import dynamic from 'next/dynamic'
import { Code } from './code.types'
import { useStore } from '../../store'
import { shallow } from 'zustand/shallow'
import { setLastActiveElement } from '../../utils/dom'
import { memo } from 'react'
import { Language } from '../../utils/hljs'

const SyntaxedInput = dynamic(() => import('./syntaxed.input'), {
  ssr: false,
})

type Props = {
  value: Code
  onChange: (newValue: Code) => void
}

function CodeInput({ value, onChange }: Props) {
  const [updateBlock, updateCursor, updateActiveElementByArrow] = useStore(
    (state) => [
      state.updateBlock,
      state.updateCursor,
      state.updateActiveElementByArrow,
    ],
    shallow
  )

  return (
    <div className="mb-3">
      <SyntaxedInput
        id={value.id}
        value={value.text}
        filename={value.filename}
        language={value.language.toLocaleLowerCase() as Language}
        placeholder="Code"
        onKeyUp={(e) => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowRight':
            case 'ArrowLeft':
              updateActiveElementByArrow(
                e.key,
                {
                  start: e.currentTarget.selectionStart,
                  end: e.currentTarget.selectionEnd,
                },
                value
              )
              break
          }
        }}
        onKeyDown={(e) => {
          switch (e.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case 'ArrowRight':
            case 'ArrowLeft':
              updateCursor(e.currentTarget.selectionEnd)
              break
            case 'Tab':
              e.preventDefault()
              updateBlock({ ...value, text: `${value.text}  ` })
              break
          }
        }}
        onChange={(e) => {
          onChange({ ...value, text: e.target.value })
        }}
        onBlur={setLastActiveElement}
        onFocus={setLastActiveElement}
        onFilenameChange={(filename) => {
          onChange({ ...value, filename })
        }}
        onLanguageChange={(language) => {
          onChange({ ...value, language })
        }}
      />
    </div>
  )
}

export default memo(CodeInput)
