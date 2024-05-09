import { Button } from '@mui/material'
import React from 'react'

const PrimaryButton = ({text}) => {
  return (
    <Button
    sx={{
      bgcolor: "#A62639",
      color: '#FFFFFF',
      borderRadius: "2rem",
      padding: "6px 20px",
      '&:hover': {
        bgcolor: "#d8465c", // Cambia el color al pasar el cursor sobre el botón
      }
    }}
    variant='contained'
  >
    {text}
    </Button>    
  )
}

export default PrimaryButton