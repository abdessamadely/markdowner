import { useState } from 'react'
import { Heading, Level } from './heading.types'
import { randomString } from '../../utils/strings'
import ToolbarButton from '../../toolbar-button'

type Props = {
  onClick?: (heading: Heading) => void
}

export default function HeadingAction({ onClick }: Props) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <ToolbarButton
        title="Insert New Heading"
        onClick={() => {
          setIsOpen((prev) => !prev)
        }}
        className="text-sm font-bold h-8"
      >
        H
      </ToolbarButton>

      <div
        className="absolute right-0 top-full z-30 pt-1 bg-zinc-100 dark:bg-zinc-700"
        style={{
          display: isOpen ? '' : 'none',
        }}
      >
        <ToolbarButton
          title="Insert New H2 Heading"
          onClick={() => {
            setIsOpen(false)
            if (!onClick) {
              return
            }
            onClick({
              id: randomString(),
              type: 'heading',
              level: Level.H2,
              text: '',
            })
          }}
          className="text-sm font-bold h-8"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          title="Insert New H3 Heading"
          onClick={() => {
            setIsOpen(false)
            if (!onClick) {
              return
            }
            onClick({
              id: randomString(),
              type: 'heading',
              level: Level.H3,
              text: '',
            })
          }}
          className="text-sm font-bold h-8"
        >
          H3
        </ToolbarButton>
        <ToolbarButton
          title="Insert New H4 Heading"
          onClick={() => {
            setIsOpen(false)
            if (!onClick) {
              return
            }
            onClick({
              id: randomString(),
              type: 'heading',
              level: Level.H4,
              text: '',
            })
          }}
          className="text-sm font-bold h-8"
        >
          H4
        </ToolbarButton>
      </div>
    </div>
  )
}
