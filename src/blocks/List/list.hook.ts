import {
  useContext,
  useCallback,
  FocusEventHandler,
  KeyboardEventHandler,
  ChangeEvent,
} from 'react'
import { MarkdownerContext } from '@/core'
import { ListContext } from './list.context'

export function useList() {
  const { block, listTree } = useContext(ListContext)
  const { state, dispatch } = useContext(MarkdownerContext)

  const handleBlur = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      dispatch({ type: 'DEACTIVATE_BLOCK', payload: {} })
    },
    [dispatch],
  )

  const handleFocus = useCallback<FocusEventHandler<HTMLTextAreaElement>>(
    (e) => {
      e.preventDefault()
      if (block) {
        dispatch({ type: 'ACTIVATE_BLOCK', payload: { block } })
      }
    },
    [block, dispatch],
  )

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>(
    (e) => {
      switch (e.key) {
        case 'Enter':
          e.preventDefault()
          break
      }
    },
    [],
  )

  const handleOnItemChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (!block || !state.activeBlockId || state.activeBlockId !== block.id) {
        return
      }

      const id = e.currentTarget.id
      const value = e.currentTarget.value
      const treeItem = listTree.find((p) => p.split('/').pop() === id)

      if (treeItem) {
        dispatch({
          type: 'UPDATE_LIST_ITEM',
          payload: { path: treeItem, value },
        })
      }
    },
    [dispatch, block, listTree, state.activeBlockId],
  )

  return {
    handleBlur,
    handleFocus,
    handleKeyDown,
    handleOnItemChange,
  }
}
