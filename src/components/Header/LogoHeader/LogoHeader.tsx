import React from 'react'
import { Typography, Box } from '@mui/material'
function LogoHeader() {
  return (
    <Box
      component={'a'}
      href="/"
      sx={{ textDecoration: 'none', display: 'flex', gap: '10px', alignItems: 'center' }}
    >
      <img src={'./assets/images/grindery-iso.svg'} width={28} height={36} />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          sx={{
            textDecoration: 'none',
            lineHeight: '100%',
            fontSize: '20px',
            letterSpacing: '0.02em'
          }}
          variant="h6"
          color="#FFFFFF"
        >
          Nexus
        </Typography>
        <Typography
          sx={{
            textDecoration: 'none',
            lineHeight: '100%',
            fontSize: '20px',
            letterSpacing: '0.02em'
          }}
          variant="subtitle1"
          color="#FFB930"
        >
          {' '}
          Developer Platform{' '}
        </Typography>
      </Box>
    </Box>
  )
}

export default LogoHeader
