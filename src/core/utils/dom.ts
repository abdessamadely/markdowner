import { FocusEvent, KeyboardEvent } from 'react'

export type MarkdownerInputElement = HTMLTextAreaElement | HTMLInputElement
export type OnKeyUp = (e: KeyboardEvent<MarkdownerInputElement>) => void
export type OnKeyDown = (e: KeyboardEvent<MarkdownerInputElement>) => void

function getElementById(id: string): MarkdownerInputElement | null {
  return document.querySelector<MarkdownerInputElement>(`[data-id="${id}"]`)
}

function resetActiveElement() {
  document.querySelector('[data-focuse-id]')?.removeAttribute('data-focuse-id')
}

export function getActiveElement(): MarkdownerInputElement | null {
  return document.querySelector<MarkdownerInputElement>('[data-focuse-id]')
}

export function setActiveElement(
  id: string,
  selection?: { start: number | null; end: number | null }
) {
  setTimeout(() => {
    const element = getElementById(id)
    if (element) {
      if (selection) {
        element.setSelectionRange(selection.start, selection.end)
      }
      resetActiveElement()
      element.dataset.focuseId = element.dataset.id
      element.focus()
    }
  })
}

export function setLastActiveElement(e: FocusEvent<HTMLElement>) {
  resetActiveElement()
  e.target.dataset.focuseId = e.target.dataset.id
}
