import React, { useEffect, useState } from 'react'
import { Box, TextField, Typography } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AutoCompleteInput, InputBox, Button, PaperBox } from 'grindery-ui'
import { getABI } from '../../../services/getAbi'
import { getCDS } from '../../../services/convertABI'
import ReactJson from '@silizia/react-json-view'

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
  const [currentStep, setcurrentStep] = useState(0)
  const [addressContract, setContractAddress] = useState<string>('')
  const [abiValue, setAbiValue] = useState<string>('')
  const [cdsValue, setCdsValue] = useState<string>(' ')

  const handleChange = (value: string) => {
    setBlockchain(value)
    setAbiValue('')
    setCdsValue('')
    setContractAddress('')
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAbiValue(e.target.value)
  }

  const addValue = (value: object) => {
    setCdsValue(JSON.stringify(value))
  }

  const editValue = (value: object) => {
    setCdsValue(JSON.stringify(value))
  }

  const deleteValue = (value: object) => {
    setCdsValue(JSON.stringify(value))
  }

  useEffect(() => {
    if (blockchain !== '') {
      getABI({ blockchain, addressContract }).then(v => {
        setAbiValue(v.data.result)
      })
    }
  }, [addressContract, blockchain])

  const handleClick = () => {
    setcurrentStep(1)
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

      {currentStep === 0 ? (
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            marginTop: '40px',
            padding: '0px 60px 40px 0px',
            '& > div': { width: '100%' }
          }}
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
              placeholder={'ABI Json'}
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
        </Box>
      ) : (
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            marginTop: '40px',
            gap: '32px',
            borderRadius: '5px',
            ' & > div ': { width: '45%', borderRadius: '5px' }
          }}
        >
          <Box
            component={'div'}
            sx={{
              '.react-json-view': {
                height: '100%',
                overflow: 'scroll',
                padding: '10px',
                borderRadius: '5px',
                '&::-webkit-scrollbar': {
                  width: '6px',
                  marginRight: '10px'
                },
                '&::-webkit-scrollbar-track': {
                  boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
                  webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#898989',
                  borderRadius: '10px',
                  height: '96px',
                  padding: '10px'
                }
              },
              height: '400px',
              overflow: 'hidden'
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%',
                marginBottom: '4px'
              }}
            >
              CDS JSon
            </Typography>
            <ReactJson
              src={JSON.parse(cdsValue)}
              onAdd={add => addValue(add.updated_src)}
              onEdit={edit => editValue(edit.updated_src)}
              onDelete={edit => deleteValue(edit.updated_src)}
              theme={'monokai'}
            />
          </Box>
          <Box component={'div'} sx={{ '.MuiPaper-root': { height: '220px', width: '100%' } }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: '14px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%',
                marginBottom: '4px'
              }}
            >
              Preview
            </Typography>
            <PaperBox></PaperBox>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CDS
