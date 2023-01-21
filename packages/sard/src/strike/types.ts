export interface Point {
  x: number
  y: number
}

export interface SyntheticTouch {
  clientX: number
  clientY: number
  identifier: number
  target: EventTarget
}
export type SyntheticTouches = SyntheticTouch[]
