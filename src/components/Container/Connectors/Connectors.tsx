import React, { useEffect } from 'react'
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Paper,
  Typography
} from '@mui/material'

import { Link } from 'react-router-dom'

interface ConnectorsInterface {
  name: string
  icon?: string
  version: string
  status: string
}

const VALUES_CONNECTORS = [
  {
    icon: './assets/images/connector.svg',
    name: 'Connector 1',
    version: '1.0.0',
    status: 'Active'
  },
  {
    icon: './assets/images/connector.svg',
    name: 'Connector 2',
    version: '1.0.1',
    status: 'Active'
  }
]

const styleTableHeader = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '14px',
  lineHeight: '150%',
  textTransform: 'uppercase',
  color: '#0B0D17'
}

const VALUES_HEADER = ['Name', 'Version', 'Status']

function Connectors() {
  const [connectors, setConnectors] = React.useState<Array<ConnectorsInterface>>([])
  const [headerConnectors, setHeaderConnectors] = React.useState<Array<string>>([])

  useEffect(() => {
    setConnectors(VALUES_CONNECTORS)
    setHeaderConnectors(VALUES_HEADER)
  }, [])

  return (
    <Box component={'div'} sx={{ width: '1024px', margin: '60px auto' }}>
      <Typography
        variant="h3"
        sx={{ fontSize: '25px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}
      >
        Connectors
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', marginTop: '40px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={styleTableHeader}>
            <TableRow>
              {headerConnectors.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              '  tr': { border: '1px solid #DCDCDC' },
              th: { border: '0' },
              a: { textDecoration: 'none', display: 'contents' }
            }}
          >
            {connectors.map(row => (
              <Link key={row.name} to="/history">
                <TableRow>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{ display: 'flex', alignItems: 'center' }}
                  >
                    {row.icon && (
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
                        <img src={row.icon} width={24} height={24} alt={row.name} />{' '}
                      </Box>
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '150%',
                        color: '#141416'
                      }}
                    >
                      {row.name}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="h6"
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '150%',
                        color: '#898989'
                      }}
                    >
                      {row.version}
                    </Typography>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Typography
                      variant="h6"
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: '16px',
                        lineHeight: '150%',
                        color: '#898989'
                      }}
                    >
                      {row.status}
                    </Typography>
                  </TableCell>
                </TableRow>
              </Link>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Connectors
