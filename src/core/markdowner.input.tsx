import {
  ArrowDownIcon,
  ArrowUpIcon,
  EllipsisVerticalIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/react/20/solid'
import { cn } from '@/lib/utils'
import { useStore } from './store'
import { shallow } from 'zustand/shallow'
import { ParagraphInput } from './blocks'
import ToolbarButton from './toolbar-button'
import { randomString } from './utils/strings'
import { EditorBlock } from './markdowner.types'
import { MarkdownerInputElement } from './utils/dom'
import { KeyboardEvent, memo, useCallback } from 'react'
import HeadingInput from './blocks/heading/heading.input'
import CodeInput from './blocks/code/code.input'

export type Props = {
  block: EditorBlock
  isTooltipOpen: boolean
}

function MarkdownerInput({ block, isTooltipOpen }: Props) {
  const [updateBlock, updateTooltip, deleteBlock, moveBlockUp, moveBlockDown] =
    useStore(
      (state) => [
        state.updateBlock,
        state.updateTooltip,
        state.deleteBlock,
        state.moveBlockUp,
        state.moveBlockDown,
      ],
      shallow
    )

  return (
    <div className="flex items-stretch space-x-4">
      <div className={cn('relative w-10', isTooltipOpen ? 'h-10' : '')}>
        <div className={cn(isTooltipOpen ? 'absolute top-0 z-10' : '')}>
          <ToolbarButton
            onClick={() =>
              isTooltipOpen ? updateTooltip(null) : updateTooltip(block)
            }
          >
            {isTooltipOpen ? (
              <XMarkIcon className="h-4" />
            ) : (
              <EllipsisVerticalIcon className="h-4" />
            )}
          </ToolbarButton>
          <div
            className={cn(
              'flex flex-col bg-zinc-100 dark:bg-zinc-900 items-center',
              isTooltipOpen ? '' : ' hidden'
            )}
          >
            <ToolbarButton
              onClick={() => {
                updateTooltip(null)
                moveBlockUp(block)
              }}
            >
              <ArrowUpIcon className="h-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => {
                updateTooltip(null)
                moveBlockDown(block)
              }}
            >
              <ArrowDownIcon className="h-4" />
            </ToolbarButton>
            <ToolbarButton onClick={() => deleteBlock(block)}>
              <TrashIcon className="h-4" />
            </ToolbarButton>
            {/* Show block specific options like <HeadingOptions /> change tag h1, h2, h3, ... */}
          </div>
        </div>
      </div>

      <div className="flex-grow">
        {block.type === 'paragraph' ? (
          <ParagraphInput key={block.id} value={block} onChange={updateBlock} />
        ) : block.type === 'heading' ? (
          <HeadingInput key={block.id} value={block} onChange={updateBlock} />
        ) : block.type === 'code' ? (
          <CodeInput key={block.id} value={block} onChange={updateBlock} />
        ) : null}
      </div>
    </div>
  )
}

export default memo<Props>(MarkdownerInput)
