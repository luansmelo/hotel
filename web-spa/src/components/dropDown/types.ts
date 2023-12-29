interface Action {
  label: string
  onClick: () => void
  icon?: React.ReactNode
}

export interface DropdownProps {
  actions: Action[]
  onClose: () => void
  anchorEl?: HTMLElement | null
}
