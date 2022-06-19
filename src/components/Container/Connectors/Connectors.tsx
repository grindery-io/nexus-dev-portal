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

interface ConnectorsInterface {
  name: string
  icon?: string
  version: string
  status: string
}

const VALUES_CONNECTORS = [
  {
    icon: './assets/images/connector.svg',
    name: 'Filename 1',
    version: '1.0.0',
    status: 'Active'
  }
]

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
      <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headerConnectors.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {connectors.map(row => (
              <TableRow key={row.name}>
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
                <TableCell>
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
                    {row.version}
                  </Typography>
                </TableCell>
                <TableCell>
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
                    {row.status}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default Connectors
