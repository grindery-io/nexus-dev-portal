import React from 'react'
import { IconButton, Button, MenuItem, Menu, Box, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'

type TList = {
  name: string
  link: string
}

interface TListMenu {
  todoList: TList[]
}

function ListHeader(props: TListMenu): React.ReactElement {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  return (
    <Box component={'div'} sx={{ marginLeft: 'auto' }}>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {props.todoList.map(page => (
            <MenuItem key={page.name} onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{page.name}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        {props.todoList.map(page => (
          <Button
            component={'a'}
            href={page.link}
            key={page.name}
            onClick={handleCloseNavMenu}
            sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
          >
            {page.name}
          </Button>
        ))}
      </Box>
    </Box>
  )
}

export default ListHeader
