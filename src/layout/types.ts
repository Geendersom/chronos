export type TimerKind = 'digital' | 'circular' | 'analog' | 'hourglass' | 'alarm' | 'pomodoro'

export interface TimerOption {
  id: TimerKind
  label: string
  title: string
  icon: string
}
