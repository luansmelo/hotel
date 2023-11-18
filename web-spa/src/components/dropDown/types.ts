interface Action {
  label: string
  onClick: () => void
}

export interface DropdownProps {
  actions: Action[]
  onClose: () => void
  anchorEl?: HTMLElement | null
}
