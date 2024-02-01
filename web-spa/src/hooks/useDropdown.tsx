import { useState, useCallback } from 'react'

interface DropdownState {
  [key: string]: HTMLElement | null
}

interface DropdownActions {
  handleOpenDropdown: (
    event: React.MouseEvent<HTMLElement>,
    inputId: string
  ) => void
  handleCloseDropdown: (inputId: string) => void
}

const useDropdown = (): [DropdownState, DropdownActions] => {
  const [anchorEl, setDropdownAnchorEl] = useState<DropdownState>({})

  const handleOpenDropdown = useCallback(
    (event: React.MouseEvent<HTMLElement>, inputId: string) => {
      setDropdownAnchorEl((prevAnchors) => ({
        ...prevAnchors,
        [inputId]: event.currentTarget,
      }))
    },
    []
  )

  const handleCloseDropdown = useCallback((inputId: string) => {
    setDropdownAnchorEl((prevAnchors) => ({
      ...prevAnchors,
      [inputId]: null,
    }))
  }, [])

  const dropdownState: DropdownState = anchorEl
  const dropdownActions: DropdownActions = {
    handleOpenDropdown,
    handleCloseDropdown,
  }

  return [dropdownState, dropdownActions]
}

export default useDropdown
