import { Paragraph } from './paragraph.types'
import { randomString } from '../../utils/strings'
import ToolbarButton from '../../toolbar-button'

type Props = {
  onClick?: (block: Paragraph) => void
}

export default function ParagraphAction({ onClick }: Props) {
  return (
    <ToolbarButton
      title="Insert New Paragraph"
      onClick={() => {
        if (!onClick) {
          return
        }
        onClick({
          id: randomString(),
          type: 'paragraph',
          text: '',
        })
      }}
      className="text-sm font-bold h-8"
    >
      P
    </ToolbarButton>
  )
}
