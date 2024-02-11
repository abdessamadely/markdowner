import React from 'react'
import { Paragraph } from './paragraph.types'

export type Props = {
  paragraph: Paragraph
}

export function ParagraphRenderer({ paragraph: { text } }: Props) {
  return <p className="mb-2" dangerouslySetInnerHTML={{ __html: text }} />
}
