import React from 'react'
import { Skeleton } from '@mui/material'

interface SkeletonCellProps {
  colIndex: number
  height?: number
  borderRadius?: number
  marginBottom?: number
}

const SkeletonCell: React.FC<SkeletonCellProps> = ({
  colIndex,
  height = 14,
  borderRadius = 0,
  marginBottom = 0,
}) => (
  <Skeleton
    key={colIndex}
    height={height}
    sx={{
      padding: '20px 10px',
      '&:nth-child(odd)': {
        background: '#272a34',
      },
      backgroundColor: '#30333F',
      borderRadius: `${borderRadius}px`,
      marginBottom: `${marginBottom}px`,
    }}
    variant="rectangular"
    width="100%"
  />
)

export default SkeletonCell
