import React from 'react'
import { Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
function LogoHeader() {
  return (
    <Box
      component={'div'}
      sx={{
        textDecoration: 'none',
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
        ' & > a': { display: 'contents', textDecoration: 'none' }
      }}
    >
      <Link to="/">
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
      </Link>
    </Box>
  )
}

export default LogoHeader
