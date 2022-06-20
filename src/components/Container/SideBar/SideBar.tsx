import React from 'react'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { Drawer, Button } from 'grindery-ui'
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse
} from '@mui/material'

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
}

function SideBar({ SideBarList, updateSelectedItem }: ListProps) {
  const [open, setOpen] = React.useState(true)
  const [listValues] = React.useState<ListProps['SideBarList']>(SideBarList)

  const handleClick = () => {
    setOpen(!open)
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
          {'Filename 1'}
        </Typography>
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
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', sm: 'block' },
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: '375px',
          position: 'relative',
          height: 'calc( 100vh - 92px)',
          backgroundColor: '#F4F5F7'
        }
      }}
      open
    >
      {drawer}
    </Drawer>
  )
}

export default SideBar
