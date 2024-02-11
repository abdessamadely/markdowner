export enum Level {
  H2 = 2,
  H3,
  H4,
}

export interface Heading {
  id: string
  type: 'heading'
  level: Level
  text: string
}
