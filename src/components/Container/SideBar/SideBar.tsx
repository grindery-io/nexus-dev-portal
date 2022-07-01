import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Drawer, Button, SelectSimple } from 'grindery-ui'
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse,
  IconButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop'

import { ExpandLess, ExpandMore } from '@mui/icons-material'

const styleType = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '700',
  fontSize: '16px',
  lineHeight: '150%',
  textTransform: 'uppercase',
  color: '#898989'
}

const styleSubList = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '150%',
  color: '#141416'
}

const styleButton = {
  backgroundColor: '#FFB930',
  color: '#0B0D17',
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '160%',
  padding: '15px 25px',
  '&:hover': {
    backgroundColor: '#FFB930',
    opacity: '0.7'
  }
}
interface ListItemProps {
  name: string
  subList: Array<{
    name: string
    seleted: boolean
  }>
}

interface ListProps {
  SideBarList: ListItemProps[]
  updateSelectedItem: (values: ListItemProps[]) => void
  setOpenDrawel: (value: boolean) => void
}

function SideBar({ SideBarList, updateSelectedItem, setOpenDrawel }: ListProps) {
  const [open, setOpen] = React.useState(true)
  const [openSidebar, setOpenSidebar] = React.useState(true)
  const [listValues] = React.useState<ListProps['SideBarList']>(SideBarList)
  const [version, setVersion] = React.useState<string>('1.0.0')

  const versionOptions = [
    { label: '1.0.0', value: '1.0.0' },
    { label: '1.0.1', value: '1.0.1' }
  ]

  const handleClick = () => {
    setOpen(!open)
  }

  const handleDrawerOpen = () => {
    setOpenSidebar(true)
    setOpenDrawel(true)
  }

  const handleDrawerClose = () => {
    setOpenSidebar(false)
    setOpenDrawel(false)
  }

  const handleClickOnItem = () => {
    console.log('Clicked')
    updateSelectedItem(listValues)
  }

  const drawer = (
    <div>
      <Box
        component={'div'}
        sx={{ display: 'flex', alignItems: 'center', padding: '20px 20px 40px 20px' }}
      >
        <Box
          component={'div'}
          sx={{
            padding: '8px',
            border: '1px solid #DCDCDC',
            borderRadius: '5px',
            backgroundColor: '#FFF',
            display: 'inline-flex',
            gap: '20px',
            marginRight: '20px'
          }}
        >
          <img src={'./assets/images/connector.svg'} width={40} height={40} alt={'Connector'} />{' '}
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '150%',
            color: '#141416'
          }}
        >
          {'MolochDAO'}
        </Typography>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerClose}
          edge="start"
          sx={{
            transform: 'rotate(-90deg)',
            color: '#979797',
            mr: 2,
            marginLeft: 'auto',
            marginTop: '-40px',
            marginRight: '0px',
            ...(openSidebar && { display: 'block' })
          }}
        >
          <VerticalAlignTopIcon />
        </IconButton>
      </Box>
      <Divider />
      <Box
        component={'div'}
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          padding: '20px',
          '& .MuiOutlinedInput-root': { width: '90px', background: '#fff' }
        }}
      >
        <Typography
          variant="subtitle2"
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '19px',
            color: '#141416',
            opacity: '0.5'
          }}
        >
          {'Version'}
        </Typography>
        <SelectSimple
          options={versionOptions}
          onChange={(v: string) => setVersion(v)}
          value={version}
        />
      </Box>
      <Divider />
      <List>
        {SideBarList.map(listItem => (
          <>
            <ListItemButton key={listItem.name}>
              <ListItemText
                primary={listItem.name}
                sx={{ ' &>span': styleType }}
                onClick={handleClick}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {listItem.subList.map(subListItem => (
                  <ListItemButton
                    key={subListItem.name}
                    sx={subListItem.seleted ? { pl: 4, backgroundColor: '#FFB930' } : { pl: 4 }}
                  >
                    <ListItemText
                      onClick={handleClickOnItem}
                      sx={{ ' & > span': styleSubList }}
                      primary={subListItem.name}
                    />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </>
        ))}
      </List>
      <Box
        component={'div'}
        sx={{
          button: styleButton,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '40px 0px'
        }}
      >
        <Button variant="contained" size="sx" value="Publish connector" />
      </Box>
    </div>
  )

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          position: 'absolute',
          left: '24px',
          color: '#979797',
          marginTop: '26px',
          ...(openSidebar && { display: 'none' })
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        variant="persistent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: '375px',
            position: 'relative',
            height: '100%',
            backgroundColor: '#F4F5F7',
            ...(!openSidebar && { display: 'none!important' })
          }
        }}
        open={openSidebar}
      >
        {drawer}
      </Drawer>
    </>
  )
}

export default SideBar
