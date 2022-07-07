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
        url: 'version',
        seleted: false
      },
      {
        name: 'Sharing',
        url: '/sharing',
        seleted: false
      },
      {
        name: 'Manage Team',
        url: '/manage-team',
        seleted: false
      },
      {
        name: 'Analitycs',
        url: '/analytics',
        seleted: false
      },
      {
        name: 'Monitoring',
        url: '/monitoring',
        seleted: false
      },
      {
        name: 'History',
        url: '/history',
        seleted: false
      },
      {
        name: 'CDS Editor',
        url: '/cds',
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

function Container({ openDrawel }: { openDrawel: boolean }) {
  const updateSelectedItem = (values: string) => {}

  const historyPage = () => {
    return (
      <>
        <SideBar
          SideBarList={SideBarList}
          openDrawel={openDrawel}
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
          openDrawel={openDrawel}
          updateSelectedItem={updateSelectedItem}
        />
        <CDS openDrawel={openDrawel} />
      </>
    )
  }

  return (
    <Box component={'div'} sx={{ display: 'flex' }}>
      <Routes>
        <Route path="/" element={<Connectors />} />
        <Route path={'history'} element={historyPage()} />
        <Route path={'cds'} element={CdsEditor()} />
      </Routes>
    </Box>
  )
}

export default Container
