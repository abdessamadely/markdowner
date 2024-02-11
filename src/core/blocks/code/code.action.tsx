import { randomString } from '@/lib/utils'
import ToolbarButton from '../../toolbar-button'
import { Code } from './code.types'

type Props = {
  onClick?: (block: Code) => void
}

function CodeAction({ onClick }: Props) {
  return (
    <ToolbarButton
      title="Insert New Paragraph"
      onClick={() => {
        if (!onClick) {
          return
        }
        onClick({
          id: randomString(),
          type: 'code',
          text: '',
          filename: 'Untitled.ts',
          language: 'typescript',
        })
      }}
      className="text-sm font-bold h-8"
    >
      {'</>'}
    </ToolbarButton>
  )
}
export default CodeAction
