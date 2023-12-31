export interface PaginationComponentProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}
