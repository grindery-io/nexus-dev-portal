import React from 'react'
import Connectors from './Connectors'
import SideBar from './SideBar'
import History from './History'
import CDS from './CDS'
import { Box } from '@mui/material'
import { Routes, Route } from 'react-router-dom'

const SideBarList = [
  {
    name: 'Build',
    subList: [
      {
        name: 'Version',
        seleted: false
      },
      {
        name: 'Sharing',
        seleted: false
      },
      {
        name: 'Manage Team',
        seleted: false
      },
      {
        name: 'Analitycs',
        seleted: false
      },
      {
        name: 'Monitoring',
        seleted: false
      },
      {
        name: 'History',
        seleted: false
      },
      {
        name: 'CDS Editor',
        seleted: true
      }
    ]
  },
  {
    name: 'Manage',
    subList: []
  },
  {
    name: 'Embed',
    subList: []
  }
]

interface ListItemProps {
  name: string
  subList: Array<{
    name: string
    seleted: boolean
  }>
}

function Container() {
  const [openDrawel, setOpenDrawel] = React.useState<boolean>(true)

  const updateSelectedItem = (values: ListItemProps[]) => {
    console.log(values)
    console.log(openDrawel)
  }

  const historyPage = () => {
    return (
      <>
        <SideBar
          SideBarList={SideBarList}
          setOpenDrawel={setOpenDrawel}
          updateSelectedItem={updateSelectedItem}
        />
        <History />
      </>
    )
  }

  const CdsEditor = () => {
    return (
      <>
        <SideBar
          SideBarList={SideBarList}
          setOpenDrawel={setOpenDrawel}
          updateSelectedItem={updateSelectedItem}
        />
        <CDS openDrawel={openDrawel} />
      </>
    )
  }

  return (
    <Box component={'div'} sx={{ display: 'flex', gap: '40px' }}>
      <Routes>
        <Route path="/" element={<Connectors />} />
        <Route path={'history'} element={historyPage()} />
        <Route path={'cds'} element={CdsEditor()} />
      </Routes>
    </Box>
  )
}

export default Container
