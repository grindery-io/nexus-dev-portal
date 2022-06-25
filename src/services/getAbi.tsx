import axios, { AxiosResponse } from 'axios'

interface abiProps {
  blockchain: string
  addressContract: string
}

const API_ENDPOINT = {
  ethereum: {
    URL: 'https://api.etherscan.io/api?module=contract',
    API_TOKEN: '6F5G5QRI6H9RHVT218T8HSK8RIAJ3R1ABF'
  },
  polygon: {
    URL: 'https://api.polygonscan.com/api?module=contract',
    API_TOKEN: 'DGJQAWP72Y5DZ2CRBYF64B1ITBE67EJ3XB'
  },
  xdai: {
    URL: 'https://blockscout.com/xdai/mainnet/api?module=contract',
    API_TOKEN: 'e9189f80-3186-400f-a947-da071072144c'
  }
}

export const getABI = async ({ blockchain, addressContract }: abiProps) => {
  const { URL, API_TOKEN } = API_ENDPOINT[blockchain as keyof typeof API_ENDPOINT]

  return axios
    .get(URL + '&action=getabi&address=' + addressContract + '&apikey=' + API_TOKEN)
    .then((response: AxiosResponse) => response)
}
