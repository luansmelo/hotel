export interface Action<T> {
  actionClass: string
  label: string
  onClick: (item: T) => void
  icon: React.ReactNode
}
