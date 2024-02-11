import autosize from 'autosize'
import { Paragraph } from './paragraph.types'
import { useStore } from '../../store'
import { shallow } from 'zustand/shallow'
import { randomString } from '../../utils/strings'
import { setLastActiveElement } from '../../utils/dom'
import { memo, useEffect, useRef } from 'react'

type Props = {
  value: Paragraph
  onChange: (newValue: Paragraph) => void
}

function ParagraphInput({ value, onChange }: Props) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const [addBlock, updateCursor, updateActiveElementByArrow] = useStore(
    (state) => [
      state.addBlock,
      state.updateCursor,
      state.updateActiveElementByArrow,
    ],
    shallow
  )

  useEffect(() => {
    const element = ref.current as HTMLTextAreaElement
    autosize(element)
  }, [])

  return (
    <textarea
      ref={ref}
      rows={1}
      data-id={value.id}
      value={value.text}
      onChange={({ target: { value: text } }) => onChange({ ...value, text })}
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
          case 'Enter':
            e.preventDefault()
            addBlock({
              id: randomString(),
              type: 'paragraph',
              text: '',
            })
            break
        }
      }}
      onBlur={setLastActiveElement}
      onFocus={setLastActiveElement}
      placeholder="Paragraph"
      autoComplete="off"
      className="w-full pb-3 bg-transparent resize-none focus:outline-none"
    />
  )
}

export default memo(ParagraphInput)
