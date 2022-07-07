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
  date: string
  admin: string
  action: string
  info: string
}

const VALUES_CONNECTORS = [
  {
    date: '2022-06-16 11:20:08',
    admin: 'yuridek@gmail.com',
    action: 'version added',
    info: '1.0.0'
  }
]

const styleTableHeader = {
  fontFamily: 'Roboto',
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '150%',
  color: '#0B0D17'
}

const styleTableCell = {
  fontStyle: 'normal',
  fontWeight: '400',
  fontSize: '16px',
  lineHeight: '150%',
  color: '#0B0D17'
}

const styleAdmin = {
  fontStyle: 'normal',
  fontSize: '16px',
  lineHeight: '150%',
  color: '#E48B05',
  fontWeight: '700'
}

const VALUES_HEADER = ['Date', 'Admin', 'Action', 'More info']

function History() {
  const [connectors, setConnectors] = React.useState<Array<ConnectorsInterface>>([])
  const [headerConnectors, setHeaderConnectors] = React.useState<Array<string>>([])

  useEffect(() => {
    setConnectors(VALUES_CONNECTORS)
    setHeaderConnectors(VALUES_HEADER)
  }, [])

  return (
    <Box component={'div'} sx={{ width: '816px', margin: '60px auto' }}>
      <Typography
        variant="h3"
        sx={{ fontSize: '25px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}
      >
        History
      </Typography>
      <TableContainer component={Paper} sx={{ boxShadow: 'none', marginTop: '60px' }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ th: styleTableHeader }}>
            <TableRow>
              {headerConnectors.map(header => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody sx={{ 'tr > th': { borderBottom: '0px' } }}>
            {connectors.map(row => (
              <TableRow key={row.date}>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" sx={styleTableCell}>
                    {row.date}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" sx={styleAdmin}>
                    {row.admin}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" sx={styleTableCell}>
                    {row.action}
                  </Typography>
                </TableCell>
                <TableCell component="th" scope="row">
                  <Typography variant="h6" sx={styleTableCell}>
                    {row.info}
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

export default History
