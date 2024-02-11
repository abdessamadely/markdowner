import { cn } from '@/lib/utils'
import { MouseEvent, ReactNode } from 'react'

type Props = {
  title?: string
  className?: string
  children: ReactNode
  onClick(e: MouseEvent<HTMLButtonElement>): void
}

export default function ToolbarButton({
  title,
  className,
  children,
  onClick,
}: Props) {
  return (
    <button
      type="button"
      title={title}
      className={cn(
        'flex items-center justify-center w-10 h-10 transition-colors duration-300 bg-zinc-100 dark:bg-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-600 text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white',
        className
      )}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
