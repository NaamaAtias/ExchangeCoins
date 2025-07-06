export const coinService = {
  getExchangeRate,
  get10Coins,
}

import axios from 'axios'
import { storageService } from './storage.service'

// const RATE_KEY = 'Rate'

function get10Coins() {
  return [
    { id: 'btc-bitcoin', name: 'Bitcoin', symbol: 'BTC' },
    { id: 'eth-ethereum', name: 'Ethereum', symbol: 'ETH' },
    { id: 'bnb-binance-coin', name: 'BNB', symbol: 'BNB' },
    { id: 'xrp-xrp', name: 'XRP', symbol: 'XRP' },
    { id: 'ada-cardano', name: 'Cardano', symbol: 'ADA' },
    { id: 'sol-solana', name: 'Solana', symbol: 'SOL' },
    { id: 'ltc-litecoin', name: 'Litecoin', symbol: 'LTC' },
    { id: 'usd-us-dollars', name: 'US Dollar', symbol: 'USD' },
    { id: 'eur-euro', name: 'Euro', symbol: 'EUR' },
    { id: 'matic-polygon', name: 'Polygon', symbol: 'MATIC' },
    // { id: 'ils-israeli-new-shekel', name: 'Israeli Shekel', symbol: 'ILS' },
  ]
}

async function getExchangeRate(amount, baseCoin, quoteCoin) {
  const cacheKey = `amount:${amount}, from ${baseCoin}, to ${quoteCoin}`
  const cached = storageService.load(cacheKey)
  if (cached) return cached

  try {
    const response = await axios.post(`http://localhost:5000/api/convert`, {
      params: {
        amount,
        baseCoin,
        quoteCoin,
      },
    })
    const result = response.data
    storageService.save(cacheKey, result)
    return result
  } catch (error) {
    console.error('Error fetching from backend:', error)
    throw error
  }
}

// async function getExchangeRate(amount, baseCoin, quoteCoin) {
//   const coinToCoinRes = storageService.load(`amount:${amount}, from ${baseCoin}, to ${quoteCoin}`)
//   if (coinToCoinRes) return coinToCoinRes
//   console.log(baseCoin, quoteCoin, amount)
//   try {
//     const response = await axios.get(
//       `https://api.coinpaprika.com/v1/price-converter?base_currency_id=${baseCoin}&quote_currency_id=${quoteCoin}&amount=${amount}`,
//     )
//     console.log('getting new data from api...', response)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }
