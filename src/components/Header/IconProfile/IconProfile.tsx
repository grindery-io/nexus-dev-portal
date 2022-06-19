import React from 'react'
import { Box, IconButton, Avatar, Typography } from '@mui/material'

type Profile = {
  name: string
  ocupation: string
  avatar: string
}

interface TIconProfile {
  profileOptions: Profile
}

function IconProfile(props: TIconProfile): React.ReactElement {
  const { name, ocupation, avatar } = props.profileOptions
  return (
    <Box
      sx={{
        flexGrow: 0,
        backgroundColor: 'rgba(244, 247, 252, 0.1)',
        borderRadius: '8px',
        padding: '12px',
        display: 'flex',
        gap: '10px',
        marginLeft: '40px'
      }}
    >
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'end',
          justifyContent: 'center',
          width: '100px'
        }}
      >
        <Typography
          variant="subtitle1"
          color="#FFFFFF"
          sx={{ fontSize: '14px', fontStyle: 'normal', fontWeight: '700', lineHeight: '150%' }}
        >
          {name}
        </Typography>
        <Typography
          variant="subtitle2"
          color="#FFFFFF"
          sx={{
            fontSize: '12px',
            fontStyle: 'normal',
            fontWeight: '400',
            lineHeight: '150%',
            opacity: '0.6'
          }}
        >
          {ocupation}
        </Typography>
      </Box>
      <IconButton sx={{ p: 0 }}>
        <Avatar alt={name} sx={{ width: 48, height: 48 }} src={avatar} />
      </IconButton>
    </Box>
  )
}

export default IconProfile
