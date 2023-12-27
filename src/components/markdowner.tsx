import { memo } from 'react'
import { EditorBlock } from './markdowner.types'

type Props = {
  blocks: EditorBlock[]
}

function Markdowner(props: Props) {
  return (
    <div className="text-blue-500">
      <strong className="italic">Blocks:</strong>{' '}
      <span>{props.blocks.length}</span>
    </div>
  )
}

export default memo<Props>(
  Markdowner,
  ({ blocks: prevBlocks }, { blocks: nextBlocks }) =>
    JSON.stringify(prevBlocks) === JSON.stringify(nextBlocks)
)
