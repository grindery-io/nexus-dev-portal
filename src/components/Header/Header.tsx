import React from 'react'
import { LogoHeader } from './LogoHeader'
import { ListHeader } from './ListHeader'
import { IconProfile } from './IconProfile'
import { AppBar, Container, Toolbar } from '@mui/material'

const headerOptions = [{ name: 'My Integrations', link: '/' }]

const profileOptions = {
  name: 'Yuri Dekovic',
  ocupation: 'Developer',
  avatar: 'https://i.pravatar.cc/300'
}

function Header() {
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        padding: '0px 26px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#0B0D17'
      }}
    >
      <Container maxWidth="xl" sx={{ padding: '0px!important', height: '100%' }}>
        <Toolbar sx={{ height: '92px' }} disableGutters>
          <LogoHeader />
          <ListHeader todoList={headerOptions} />
          <IconProfile profileOptions={profileOptions} />
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Header
