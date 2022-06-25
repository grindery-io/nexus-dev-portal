import React, { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AutoCompleteInput, InputBox, Button } from 'grindery-ui'
import { getABI } from '../../../services/getAbi'
import { getCDS } from '../../../services/convertABI'

interface typeCDS {
  key: string
  name: string
  version: string
  platformVersion: string
  triggers: any
  actions: any
}

function CDS() {
  const options = [
    {
      label: 'Ethereum (Mainnet)',
      value: 'ethereum',
      icon: './assets/images/ethereum.svg'
    },
    {
      label: 'xDai',
      value: 'xdai',
      icon: './assets/images/xdai.svg'
    },
    {
      label: 'Polygon',
      value: 'polygon',
      icon: './assets/images/polygon.svg'
    }
  ]

  const [blockchain, setBlockchain] = useState<string>('')
  const [addressContract, setContractAddress] = useState<string>('')
  const [abiValue, setAbiValue] = useState<string>('')
  const [cdsValue, setCdsValue] = useState<typeCDS | string>('')

  const handleChange = (value: string) => {
    setBlockchain(value)
    setAbiValue('')
    setCdsValue('')
    setContractAddress('')
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAbiValue(e.target.value)
  }

  useEffect(() => {
    if (blockchain !== '') {
      getABI({ blockchain, addressContract }).then(v => {
        setAbiValue(v.data.result)
      })
    }
  }, [addressContract, blockchain])

  const handleClick = () => {
    console.log('adsasd')
    const result = getCDS(abiValue)
    setCdsValue(JSON.stringify(result, null, 2))
  }

  return (
    <Box component={'div'} sx={{ width: '1024px', margin: '60px auto' }}>
      <Typography
        variant="h3"
        sx={{ fontSize: '25px', fontStyle: 'normal', fontWeight: '700', lineHeight: '120%' }}
      >
        CDS
      </Typography>
      <Box
        component={'div'}
        sx={{ display: 'flex', marginTop: '40px', gap: '40px', '& > div': { width: '50%' } }}
      >
        <Box sx={{ textarea: { height: '200px!important' } }}>
          <AutoCompleteInput
            options={options}
            label={'Select Blockchanin'}
            value={blockchain}
            placeholder={'Search for an Blockchain'}
            onChange={(v: string) => handleChange(v)}
            required={true}
          ></AutoCompleteInput>

          <InputBox
            type={'text'}
            value={addressContract}
            onChange={(v: string) => setContractAddress(v)}
            label="Smart Contract Address"
            required={true}
          ></InputBox>

          <TextField
            fullWidth
            placeholder={'Hello'}
            multiline
            onChange={e => handleChangeInput(e)}
            value={abiValue}
            rows={3}
            maxRows={10}
          />
          <Button
            value={'Generate CDS'}
            variant="contained"
            color="secondary"
            size="large"
            loading={true}
            onClick={handleClick}
          ></Button>
        </Box>

        <Box sx={{ textarea: { height: '400px!important' } }}>
          <TextField
            fullWidth
            placeholder={'CDS JSON'}
            multiline
            value={cdsValue}
            disabled
            rows={3}
            maxRows={10}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default CDS
