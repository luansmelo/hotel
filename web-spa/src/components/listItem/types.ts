export interface Action<T> {
  label: string
  onClick: (item: T) => void
  icon: React.ReactNode
}
