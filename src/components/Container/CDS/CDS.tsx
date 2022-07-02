import React, { useEffect, useState, useRef } from 'react'
import { Box, TextField, Typography } from '@mui/material'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { AutoCompleteInput, InputBox, Button, PaperBox, SelectInput } from 'grindery-ui'
import { getABI } from '../../../services/getAbi'
import { getCDS } from '../../../services/convertABI'
import ReactJson from '@silizia/react-json-view'

import SvgIcon from '@mui/material/SvgIcon'

function CDS({ openDrawel }: any) {
  const options = [
    {
      label: 'Ethereum (Mainnet)',
      value: 'ethereum',
      icon: './assets/images/ethereum.svg'
    },
    {
      label: 'Gnosis',
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
  const [connectorOptions, setConnectorOptions] = useState<any[]>([])
  const [connector, setConnector] = useState<string>('')
  const [trigger, setTrigger] = useState<string>('')
  const [actions, setActions] = useState<string>('')
  const [actionOptions, setActionOptions] = useState<any[]>([])
  const [triggresOptions, setTriggresOptions] = useState<any[]>([])
  /* const [initialPos, setInitialPos] = React.useState<number>(0) */
  const myRef = useRef(null)

  const styleCursor = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }

  const handleChange = (value: string) => {
    setBlockchain(value)
    setAbiValue('')
    setCdsValue('')
    setContractAddress('')
  }

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAbiValue(e.target.value)
  }

  const updateData = (value: any) => {
    const key = value.key
    const name = value.name

    const iconLogo = options.filter(item => item.value === blockchain)[0].icon

    const actionOptionsValues = value.actions.map((action: any) => ({
      value: action.key,
      label: action.display?.label,
      icon: iconLogo,
      description: action.display?.description
    })) as any[]

    const triggresOptionsValues = value.triggers.map((trigger: any) => ({
      value: trigger.key,
      label: trigger.display?.label,
      icon: iconLogo,
      description: trigger.display?.description
    })) as any[]

    setConnectorOptions([
      {
        value: key,
        label: name,
        icon: iconLogo
      }
    ])

    setActionOptions(actionOptionsValues)

    setTriggresOptions(triggresOptionsValues)
  }

  const addValue = (value: object) => {
    setCdsValue(JSON.stringify(value))
    updateData(value)
  }

  const editValue = (value: any) => {
    console.log(value)
    setCdsValue(JSON.stringify(value))
    updateData(value)
  }

  const deleteValue = (value: object) => {
    setCdsValue(JSON.stringify(value))
    updateData(value)
  }

  const handleConnector = (value: string) => {
    setConnector(value)
  }

  const handleActionChange = (value: string) => {
    setActions(value)
  }

  const handleTriggressChange = (value: string) => {
    setTrigger(value)
  }

  /* const initial = (e: React.DragEvent<HTMLDivElement>) => {
    setInitialPos(e.clientX)
  } */

  /* const resize = (e: React.DragEvent<HTMLDivElement>) => {
    if (e.clientX !== 0) {
      const elm = document.querySelector<HTMLElement>('.editor')!
      const width = 50 - Math.floor((e.clientX - initialPos) * 0.1)
      console.log(width)
      const pre = document.querySelector<HTMLElement>('.preview')!
      elm.style.width = width + '%'
      pre.style.width = 100 - 15 - width + '%'
    }
  } */

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
    updateData(result)
  }

  return (
    <Box
      component={'div'}
      sx={{ width: '100%', margin: '60px auto', ...(!openDrawel && { padding: '0px 80px' }) }}
    >
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
          <Box
            sx={{
              textarea: { height: '200px!important' },
              span: { fontSize: '16px' }
            }}
          >
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
            borderRadius: '5px'
          }}
        >
          <Box
            component={'div'}
            className="editor"
            sx={{
              width: '50%',
              borderRadius: '5px',
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
              height: '500px',
              overflow: 'hidden'
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%',
                marginBottom: '4px',
                color: '#0B0D17'
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
          <div style={styleCursor}>
            <SvgIcon ref={myRef} sx={{ cursor: 'col-resize' }}>
              <path
                d="M10 20L10 4C10 3.73478 9.89464 3.48043 9.70711 3.29289C9.51957 3.10536 9.26522 3 9 3C8.73478 3 8.48043 3.10536 8.29289 3.29289C8.10536 3.48043 8 3.73478 8 4L8 20C8 20.2652 8.10536 20.5196 8.29289 20.7071C8.48043 20.8946 8.73478 21 9 21C9.26522 21 9.51957 20.8946 9.70711 20.7071C9.89464 20.5196 10 20.2652 10 20Z"
                fill="#898989"
              />
              <path
                d="M14 4L14 20C14 20.2652 14.1054 20.5196 14.2929 20.7071C14.4804 20.8946 14.7348 21 15 21C15.2652 21 15.5196 20.8946 15.7071 20.7071C15.8946 20.5196 16 20.2652 16 20L16 4C16 3.73478 15.8946 3.48043 15.7071 3.29289C15.5196 3.10536 15.2652 3 15 3C14.7348 3 14.4804 3.10536 14.2929 3.29289C14.1054 3.48043 14 3.73478 14 4Z"
                fill="#898989"
              />
            </SvgIcon>
          </div>
          <Box
            component={'div'}
            className="preview"
            sx={{ width: '35%', '.MuiPaper-root': { width: '100%' } }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: '16px',
                fontStyle: 'normal',
                fontWeight: '400',
                lineHeight: '150%',
                marginBottom: '4px',
                color: '#0B0D17'
              }}
            >
              Preview
            </Typography>
            <PaperBox>
              <AutoCompleteInput
                label="Connector..."
                size="full"
                placeholder="Select a Trigger"
                onChange={handleConnector}
                options={connectorOptions}
                value={connector}
              />

              <div style={{ marginTop: 10 }}>
                <SelectInput
                  label="Triggers...."
                  type="default"
                  placeholder="Select an Triggres"
                  onChange={handleTriggressChange}
                  options={triggresOptions}
                  value={trigger}
                />
              </div>

              <div style={{ marginTop: 10 }}>
                <SelectInput
                  label="Actions...."
                  type="default"
                  placeholder="Select an Action"
                  onChange={handleActionChange}
                  options={actionOptions}
                  value={actions}
                />
              </div>
            </PaperBox>
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default CDS
