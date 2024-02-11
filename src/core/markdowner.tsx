'use client'

import { useStore } from './store'
import { memo, useEffect } from 'react'
import { shallow } from 'zustand/shallow'
import { EditorBlock } from './markdowner.types'
import MarkdownerInput from './markdowner.input'
import ParagraphAction from './blocks/paragraph/paragraph.action'
import HeadingAction from './blocks/heading/heading.action'
import CodeAction from './blocks/code/code.action'

type Props = {
  blocks: EditorBlock[]
}

function Markdowner(props: Props) {
  const [blocks, tooltip, addBlock] = useStore(
    (state) => [state.blocks, state.tooltip, state.addBlock],
    shallow
  )

  useEffect(() => {
    useStore.setState({
      blocks: props.blocks,
    })
  }, [props.blocks])

  return (
    <div className="relative flex flex-col px-4 bg-white dark:bg-black">
      <div className="sticky top-14 flex justify-end z-20 w-full max-w-3xl mx-auto mt-3 mb-4">
        <div className="flex gap-1.5 bg-white dark:bg-black py-1 pl-1">
          <ParagraphAction onClick={addBlock} />
          <HeadingAction onClick={addBlock} />
          <CodeAction onClick={addBlock} />
        </div>
      </div>
      <div className="w-full max-w-3xl space-y-3 mx-auto">
        {blocks.map((block) => (
          <MarkdownerInput
            key={block.id}
            block={block}
            isTooltipOpen={tooltip?.id === block.id}
          />
        ))}
      </div>
    </div>
  )
}

export default memo<Props>(
  Markdowner,
  ({ blocks: prevBlocks }, { blocks: nextBlocks }) =>
    JSON.stringify(prevBlocks) === JSON.stringify(nextBlocks)
)
