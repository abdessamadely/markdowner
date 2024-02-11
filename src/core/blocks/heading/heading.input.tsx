import { KeyboardEvent } from 'react'
import { Level, Heading } from './heading.types'
import { useStore } from '../../store'
import { shallow } from 'zustand/shallow'
import { randomString } from '../../utils/strings'
import { setLastActiveElement } from '../../utils/dom'

type Props = {
  value: Heading
  onChange: (newValue: Heading) => void
}

export default function HeadingInput({ value, onChange }: Props) {
  const [addBlock, updateCursor, updateActiveElementByArrow] = useStore(
    (state) => [
      state.addBlock,
      state.updateCursor,
      state.updateActiveElementByArrow,
    ],
    shallow
  )

  return (
    <input
      data-id={value.id}
      value={value.text}
      onFocus={setLastActiveElement}
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
      placeholder={
        {
          [Level.H2]: 'Heading',
          [Level.H3]: 'Sub Heading',
          [Level.H4]: 'Sub Sub Headind',
        }[value.level]
      }
      autoComplete="off"
      className="w-full pb-3 bg-transparent font-bold resize-none focus:outline-none"
    />
  )
}
