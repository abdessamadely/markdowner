import { produce } from 'immer'
import { createWithEqualityFn } from 'zustand/traditional'
import { randomString } from './utils/strings'
import { EditorBlock } from './markdowner.types'
import { getActiveElement, setActiveElement } from './utils/dom'

type Selection = { start: number | null; end: number | null }

type State = {
  blocks: EditorBlock[]
  cursor: number | null
  tooltip: EditorBlock | null
  addBlock: (block: EditorBlock) => void
  updateBlock: (block: EditorBlock) => void
  updateCursor: (cursor: number | null) => void
  updateTooltip: (tooltip: EditorBlock | null) => void
  updateActiveElementByArrow: (
    key: 'ArrowUp' | 'ArrowDown' | 'ArrowRight' | 'ArrowLeft',
    selection: Selection,
    block: EditorBlock
  ) => void
  deleteBlock: (block: EditorBlock) => void
  moveBlockUp: (block: EditorBlock) => void
  moveBlockDown: (block: EditorBlock) => void
}

export const useStore = createWithEqualityFn<State>((set) => {
  const defaultBlock: EditorBlock = {
    id: randomString(),
    type: 'paragraph',
    text: '',
  }

  return {
    blocks: [defaultBlock],
    cursor: null,
    tooltip: null,
    addBlock: (block) => {
      set(
        produce((state: State) => {
          const activeElement = getActiveElement()

          if (!activeElement) {
            state.blocks.push(block)
          } else {
            const idx = state.blocks.findIndex(
              ({ id }) => id === activeElement.dataset.id
            )
            if (idx !== -1) {
              state.blocks.splice(idx + 1, 0, block)
            }
          }
          setActiveElement(block.id)
        })
      )
    },
    updateBlock: (block) => {
      set(
        produce((state: State) => {
          const idx = state.blocks.findIndex((item) => item.id === block.id)
          if (idx !== -1) {
            state.blocks[idx] = block
          }
        })
      )
    },
    deleteBlock: (block) => {
      set(
        produce((state: State) => {
          const idx = state.blocks.findIndex((item) => item.id === block.id)
          if (idx !== -1) {
            state.blocks.splice(idx, 1)
          }
          if (idx < state.blocks.length) {
            const textLength = state.blocks[idx].text.length
            setActiveElement(state.blocks[idx].id, {
              start: textLength,
              end: textLength,
            })
          }
        })
      )
    },
    updateTooltip: (tooltip) => {
      set(
        produce((state: State) => {
          state.tooltip = tooltip
        })
      )
    },
    updateCursor: (cursor) => {
      set(
        produce((state: State) => {
          state.cursor = cursor
        })
      )
    },
    updateActiveElementByArrow: (key, selection, block) => {
      if (selection.start !== selection.end) {
        return
      }

      set(
        produce((state: State) => {
          switch (key) {
            case 'ArrowUp':
            case 'ArrowLeft':
              if (selection.end === 0 && state.cursor === 0) {
                const idx = state.blocks.findIndex(
                  (item) => item.id === block.id
                )
                const prevIdx = idx - 1
                if (prevIdx >= 0) {
                  setActiveElement(state.blocks[prevIdx].id, {
                    start: state.blocks[prevIdx].text.length,
                    end: state.blocks[prevIdx].text.length,
                  })
                }
              }
              break
            case 'ArrowDown':
            case 'ArrowRight':
              if (
                selection.end === block.text.length &&
                state.cursor === block.text.length
              ) {
                const idx = state.blocks.findIndex(
                  (item) => item.id === block.id
                )
                const nextIdx = idx + 1
                if (nextIdx <= state.blocks.length) {
                  setActiveElement(state.blocks[nextIdx].id, {
                    start: 0,
                    end: 0,
                  })
                }
              }
              break
          }
        })
      )
    },
    moveBlockUp: (block) => {
      set(
        produce((state: State) => {
          const idx = state.blocks.findIndex((item) => item.id === block.id)
          if (idx === 0) {
            const removedBlock = state.blocks.shift() || defaultBlock
            state.blocks.push(removedBlock)
          } else if (idx > 0) {
            const [removedBlock] = state.blocks.splice(idx, 1)
            state.blocks.splice(idx - 1, 0, removedBlock)
          }
          setActiveElement(block.id)
        })
      )
    },
    moveBlockDown: (block) => {
      set(
        produce((state: State) => {
          const idx = state.blocks.findIndex((item) => item.id === block.id)
          if (idx + 1 === state.blocks.length) {
            const removedBlock = state.blocks.pop() || defaultBlock
            state.blocks.unshift(removedBlock)
          } else if (idx !== -1) {
            const [removedBlock] = state.blocks.splice(idx, 1)
            state.blocks.splice(idx + 1, 0, removedBlock)
          }
          setActiveElement(block.id)
        })
      )
    },
  }
}, Object.is)
