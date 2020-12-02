import Web3 from 'web3'

import {
  web3Loaded,
  web3AccountLoaded,
  tokenLoaded,
  exchangeLoaded,
  cancelledOrdersLoaded,
  filledOrdersLoaded,
  allOrdersLoaded,
  orderCancelling,
  orderCancelled,
  orderFilling,
  orderFilled,
  etherBalanceLoaded,
  tokenBalanceLoaded,
  exchangeEtherBalanceLoaded,
  exchangeTokenBalanceLoaded,
  balancesLoaded,
  balancesLoading, 
  buyOrderMaking, 
  sellOrderMaking, 
  orderMade,

  sUSDLoaded,
  cancelledOrdersLoaded_USD,
  filledOrdersLoaded_USD,
  allOrdersLoaded_USD, 
  orderFilling_USD,
  orderCancelling_USD,
  buyOrderMaking_USD, 
  sellOrderMaking_USD,
  sUSDBalanceLoaded,
  exchangesUSDBalanceLoaded,
  //balancesLoaded_USD,
  //balancesLoading_USD,

  sETHLoaded,
  cancelledOrdersLoaded_sETH,
  filledOrdersLoaded_sETH,
  allOrdersLoaded_sETH,
  orderCancelling_sETH,
  orderFilling_sETH,
  buyOrderMaking_sETH, 
  sellOrderMaking_sETH,
  sETHBalanceLoaded,
  exchangesETHBalanceLoaded,
  //balancesLoaded_sETH,
  //balancesLoading_sETH,

  sOilLoaded,
  cancelledOrdersLoaded_sOil,
  filledOrdersLoaded_sOil,
  allOrdersLoaded_sOil,
  orderCancelling_sOil,
  orderFilling_sOil,
  buyOrderMaking_sOil, 
  sellOrderMaking_sOil,
  sOilBalanceLoaded,
  exchangesOilBalanceLoaded
  //balancesLoaded_sOil
  //balancesLoading_sOil,

} from './actions'
import Token from '../abis/Token.json'
import  synthUSD from '../abis/sUSD.json'
import synthsETH from '../abis/sETH.json'
import synthsOil from '../abis/sOil.json'
import Exchange from '../abis/Exchange.json'
import { ETHER_ADDRESS } from '../helpers'

export const loadWeb3 = async() => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum)
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
      dispatch(web3Loaded(web3))
      return web3
      
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else{
      window.alert('Non_ethereum browser detected, you should consider trying Metamask')
    }
}

export const loadAccount = async (web3, dispatch) => {
  const accounts = await web3.eth.getAccounts()
  const account = accounts[0]
  console.log("coucou" + account)
  dispatch(web3AccountLoaded(account))
  return account
}

export const loadToken = async (web3, networkId, dispatch) => {
  try {
    const token = web3.eth.Contract(Token.abi, Token.networks[networkId].address)
    dispatch(tokenLoaded(token))
    return token
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadsUSD = async (web3, networkId, dispatch) => {
  try {
    const sUSD = web3.eth.Contract(synthUSD.abi, synthUSD.networks[networkId].address)
    dispatch(sUSDLoaded(sUSD))
    return sUSD
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadsETH = async (web3, networkId, dispatch) => {
  try {
    const sETH = web3.eth.Contract(synthsETH.abi, synthsETH.networks[networkId].address)
    dispatch(sETHLoaded(sETH))
    return sETH
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadsOil = async (web3, networkId, dispatch) => {
  try {
    const sOil = web3.eth.Contract(synthsOil.abi, synthsOil.networks[networkId].address)
    dispatch(sOilLoaded(sOil))
    return sOil
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadExchange = async (web3, networkId, dispatch) => {
  try {
    const exchange = web3.eth.Contract(Exchange.abi, Exchange.networks[networkId].address)
    dispatch(exchangeLoaded(exchange))
    return exchange
  } catch (error) {
    console.log('Contract not deployed to the current network. Please select another network with Metamask.')
    return null
  }
}

export const loadAllOrders = async (exchange, dispatch) => {

  //ATX  coin  case 
  //==========================

  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream = await exchange.getPastEvents('Cancel', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled orders
  const cancelledOrders = cancelStream.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded(cancelledOrders))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream = await exchange.getPastEvents('Trade', { fromBlock: 0, toBlock: 'latest' })
  // Format filled orders
  const filledOrders = tradeStream.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded(filledOrders))

  // Load order stream
  const orderStream = await exchange.getPastEvents('Order', { fromBlock: 0,  toBlock: 'latest' })
  // Format order stream
  const allOrders = orderStream.map((event) => event.returnValues)
  // Add open orders to the redux store
  dispatch(allOrdersLoaded(allOrders))

  //sUSD  coin  case 
  //==========================

  // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream_USD = await exchange.getPastEvents('Cancel_USD', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled orders
  const cancelledOrders_USD = cancelStream_USD.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded_USD(cancelledOrders_USD))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream_USD = await exchange.getPastEvents('Trade_USD', { fromBlock: 0, toBlock: 'latest' })
  // Format filled orders
  const filledOrders_USD = tradeStream_USD.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded_USD(filledOrders_USD))

  // Load order stream
  const orderStream_USD = await exchange.getPastEvents('Order_USD', { fromBlock: 0,  toBlock: 'latest' })
  // Format order stream
  const allOrders_USD = orderStream_USD.map((event) => event.returnValues)
  // Add open orders to the redux store
  dispatch(allOrdersLoaded_USD(allOrders_USD))

  //sETH coin  case 
  //==========================
    // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream_sETH = await exchange.getPastEvents('Cancel_sETH', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled orders
  const cancelledOrders_sETH = cancelStream_sETH.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded_sETH(cancelledOrders_sETH))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream_sETH = await exchange.getPastEvents('Trade_sETH', { fromBlock: 0, toBlock: 'latest' })
  // Format filled orders
  const filledOrders_sETH = tradeStream_sETH.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded_sETH(filledOrders_sETH))

  // Load order stream
  const orderStream_sETH = await exchange.getPastEvents('Order_sETH', { fromBlock: 0,  toBlock: 'latest' })
  // Format order stream
  const allOrders_sETH = orderStream_sETH.map((event) => event.returnValues)
  // Add open orders to the redux store
  dispatch(allOrdersLoaded_sETH(allOrders_sETH))

  //sOil coin  case 
  //==========================
    // Fetch cancelled orders with the "Cancel" event stream
  const cancelStream_sOil = await exchange.getPastEvents('Cancel_sOil', { fromBlock: 0, toBlock: 'latest' })
  // Format cancelled orders
  const cancelledOrders_sOil = cancelStream_sOil.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(cancelledOrdersLoaded_sOil(cancelledOrders_sOil))

  // Fetch filled orders with the "Trade" event stream
  const tradeStream_sOil = await exchange.getPastEvents('Trade_sOil', { fromBlock: 0, toBlock: 'latest' })
  // Format filled orders
  const filledOrders_sOil = tradeStream_sOil.map((event) => event.returnValues)
  // Add cancelled orders to the redux store
  dispatch(filledOrdersLoaded_sOil(filledOrders_sOil))

  // Load order stream
  const orderStream_sOil = await exchange.getPastEvents('Order_sOil', { fromBlock: 0,  toBlock: 'latest' })
  // Format order stream
  const allOrders_sOil = orderStream_sOil.map((event) => event.returnValues)
  // Add open orders to the redux store
  dispatch(allOrdersLoaded_sOil(allOrders_sOil))
}

export const subscribeToEvents = async (exchange, dispatch) => {
  exchange.events.Cancel({fromBlock: 0}, function(error, event) {
    if (error) console.log(error)
    console.log(event)
  })

  exchange.events.Trade({fromBlock: 0}, function(error, event) {
    if (error) console.log(error)
    console.log(event)
  })

  exchange.events.Deposit({fromBlock:0}, function(error, event) {
    if (error) console.log(error)
    console.log(event)
  })

  exchange.events.Withdraw({fromBlock:0}, function(error, event) {
    if (error) console.log(error)
    console.log(event)
  })

  exchange.events.Order({fromBlock:0}, function(error, event) {
    if (error) console.log(error)
    console.log(event)
  })

}

export const cancelOrder = (dispatch, exchange, order, account) => {
  exchange.methods.cancelOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const cancelOrder_USD = (dispatch, exchange, order, account) => {
  exchange.methods.cancelOrder_USD(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling_USD())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const cancelOrder_sETH = (dispatch, exchange, order, account) => {
  exchange.methods.cancelOrder_sETH(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling_sETH())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const cancelOrder_sOil = (dispatch, exchange, order, account) => {
  exchange.methods.cancelOrder_sOil(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderCancelling_sOil())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const fillOrder = (dispatch, exchange, order, account) => {
  exchange.methods.fillOrder(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderFilling())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const fillOrder_USD = (dispatch, exchange, order, account) => {
  exchange.methods.fillOrder_USD(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderFilling_USD())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const fillOrder_sETH = (dispatch, exchange, order, account) => {
  exchange.methods.fillOrder_sETH(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderFilling_sETH())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const fillOrder_sOil = (dispatch, exchange, order, account) => {
  exchange.methods.fillOrder_sOil(order.id).send({ from: account })
  .on('transactionHash', (hash) => {
     dispatch(orderFilling_sOil())
  })
  .on('error', (error) => {
    console.log(error)
    window.alert('There was an error!')
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const loadBalances = async (dispatch, web3, exchange, token, sUSD,  sETH, sOil, account) => {
  // Ether balance in wallet
  const etherBalance = await web3.eth.getBalance(account)
  dispatch(etherBalanceLoaded(etherBalance))

  // Token balance in wallet
  const tokenBalance = await token.methods.balanceOf(account).call()
  dispatch(tokenBalanceLoaded(tokenBalance))

  // sUSD balance in wallet
  const sUSDBalance = await sUSD.methods.balanceOf(account).call()
  dispatch(sUSDBalanceLoaded(sUSDBalance))

  // sETH balance in wallet
  const sETHBalance = await sETH.methods.balanceOf(account).call()
  dispatch(sETHBalanceLoaded(sETHBalance))

  // soil balance in wallet
  const sOilBalance = await sOil.methods.balanceOf(account).call()
  dispatch(sOilBalanceLoaded(sOilBalance))

  // Ether balance in exchange
  const exchangeEtherBalance = await exchange.methods.balanceOf(ETHER_ADDRESS, account).call()
  dispatch(exchangeEtherBalanceLoaded(exchangeEtherBalance))

  // Token balance in exchange
  const exchangeTokenBalance = await exchange.methods.balanceOf(token.options.address, account).call()
  dispatch(exchangeTokenBalanceLoaded(exchangeTokenBalance))

  // sUSD balance in exchange
  const exchangesUSDBalance = await exchange.methods.balanceOf(sUSD.options.address, account).call()
  dispatch(exchangesUSDBalanceLoaded(exchangesUSDBalance))

  // sETH balance in exchange
  const exchangesETHBalance = await exchange.methods.balanceOf(sETH.options.address, account).call()
  dispatch(exchangesETHBalanceLoaded(exchangesETHBalance))

    // sETH balance in exchange
  const exchangesOilBalance = await exchange.methods.balanceOf(sOil.options.address, account).call()
  dispatch(exchangesOilBalanceLoaded(exchangesOilBalance))

  // Trigger all balances loaded
  dispatch(balancesLoaded())
}


export const depositEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods.depositEther.send({from: account, value: web3.utils.toWei(amount, 'ether') })
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}  

export const withdrawEther = (dispatch, exchange, web3, amount, account) => {
  exchange.methods.withdrawEther(web3.utils.toWei(amount, 'ether')).send({from: account})
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const depositToken  = (dispatch, exchange, web3,  token, amount,  account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(exchange.options.address, amount).send({from: account})
  .on('transactionHash', (hash) => {
    exchange.methods.depositToken(token.options.address, amount).send({from: account})
    .on('transactionHash', (hash)=> {
      dispatch(balancesLoading())
    })
    .on('error', (error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })

    .on('confirmation', (reciept) => {
    window.location.reload()
    })
  })
}

export const withdrawToken = (dispatch, exchange, web3, token, amount, account) => {
  exchange.methods.withdrawToken(token.options.address, web3.utils.toWei(amount, 'ether')).send({from: account})
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error)=> {
    console.error(error)
    window.alert(`There was an  error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const depositsUSD  = (dispatch, exchange, web3,  token, amount,  account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(exchange.options.address, amount).send({from: account})
  .on('transactionHash', (hash) => {
    exchange.methods.depositsUSD(token.options.address, amount).send({from: account})
    .on('transactionHash', (hash)=> {
      dispatch(balancesLoading())
    })
    .on('error', (error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })

    .on('confirmation', (reciept) => {
    window.location.reload()
    })
  })
}

export const depositssETH  = (dispatch, exchange, web3,  token, amount,  account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(exchange.options.address, amount).send({from: account})
  .on('transactionHash', (hash) => {
    exchange.methods.depositsETH(token.options.address, amount).send({from: account})
    .on('transactionHash', (hash)=> {
      dispatch(balancesLoading())
    })
    .on('error', (error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })

    .on('confirmation', (reciept) => {
    window.location.reload()
    })
  })
}

export const depositsOil  = (dispatch, exchange, web3,  token, amount,  account) => {
  amount = web3.utils.toWei(amount, 'ether')

  token.methods.approve(exchange.options.address, amount).send({from: account})
  .on('transactionHash', (hash) => {
    exchange.methods.depositsOil(token.options.address, amount).send({from: account})
    .on('transactionHash', (hash)=> {
      dispatch(balancesLoading())
    })
    .on('error', (error) => {
      console.error(error)
      window.alert(`There was an error!`)
    })

    .on('confirmation', (reciept) => {
    window.location.reload()
    })
  })
}

export const withdrawsUSD = (dispatch, exchange, web3, token, amount, account) => {
  exchange.methods.withdrawsUSD(token.options.address, web3.utils.toWei(amount, 'ether')).send({from: account})
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error)=> {
    console.error(error)
    window.alert(`There was an  error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const withdrawssETH = (dispatch, exchange, web3, token, amount, account) => {
  exchange.methods.withdrawssETH(token.options.address, web3.utils.toWei(amount, 'ether')).send({from: account})
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error)=> {
    console.error(error)
    window.alert(`There was an  error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const withdrawsOil = (dispatch, exchange, web3, token, amount, account) => {
  exchange.methods.withdrawsOil(token.options.address, web3.utils.toWei(amount, 'ether')).send({from: account})
  .on('transactionHash', (hash) => {
    dispatch(balancesLoading())
  })
  .on('error', (error)=> {
    console.error(error)
    window.alert(`There was an  error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeBuyOrder = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeBuyOrder_USD = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  exchange.methods.makeOrder_USD(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking_USD())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeBuyOrderOracle_USD = async (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  //const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGet = web3.utils.toWei((order.amount ), 'ether')
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

  const Oracle_price = await priceFeed.methods.latestRoundData().call()
  const test = order.amount / Oracle_price[1].toString() * 100000000
  const amountGive  = web3.utils.toWei(test.toString(), 'ether')
  console.log("nb of tokens to receive :", amountGet)

  exchange.methods.makeOrder_USD(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking_USD())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  }) 
}

export const makeBuyOrder_sETH = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  exchange.methods.makeOrder_sETH(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking_sETH())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeBuyOrder_sOil = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount * order.price).toString(), 'ether')

  exchange.methods.makeOrder_sOil(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking_sOil())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeBuyOrderOracle_sOil = async (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = token.options.address
  //const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGive = ETHER_ADDRESS
  const amountGet = web3.utils.toWei((order.amount ), 'ether')
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0x48c9FF5bFD7D12e3C511022A6E54fB1c5b8DC3Ea";
  const pricesOil = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

  const aggregatorV3InterfaceABI1 = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr1 = "0x9326BFA02ADD2366b30bacB125260Af641031331";
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI1, addr1);
  

  const Oracle_price = await pricesOil.methods.latestRoundData().call()
  const sETH_price = await  priceFeed.methods.latestRoundData().call()
  
  const test = (order.amount * (Oracle_price[1]).toString() / sETH_price[1].toString()) 
  const amountGive  = web3.utils.toWei(test.toString(), 'ether')
  console.log("nb of tokens to receive :", amountGet)

  exchange.methods.makeOrder_sOil(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(buyOrderMaking_sOil())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  }) 
}


export const makeSellOrder = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const  amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount,  'ether')

  exchange.methods.makeOrder(tokenGet, amountGet, tokenGive, amountGive).send({ from: account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}


export const makeSellOrder_USD = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const  amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount,  'ether')

  exchange.methods.makeOrder_USD(tokenGet, amountGet, tokenGive, amountGive).send({ from: account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking_USD())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeSellOrderOracle_USD = async (dispatch, exchange, token, web3, order, account) => {
  const tokenGive = token.options.address
  //const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGet = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount ).toString(), 'ether')
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0x9326BFA02ADD2366b30bacB125260Af641031331";
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);

  const Oracle_price = await priceFeed.methods.latestRoundData().call()
  const sellAmount = order.amount / Oracle_price[1].toString() * 100000000
  const amountGet  = web3.utils.toWei(sellAmount.toString(), 'ether')
  console.log("nb of tokens to receive :", sellAmount)

  exchange.methods.makeOrder_USD(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking_USD())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  }) 
}

export const makeSellOrder_sETH = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const  amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount,  'ether')

  exchange.methods.makeOrder_sETH(tokenGet, amountGet, tokenGive, amountGive).send({ from: account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking_sETH())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}


export const makeSellOrder_sOil = (dispatch, exchange, token, web3, order, account) => {
  const tokenGet = ETHER_ADDRESS
  const  amountGet = web3.utils.toWei((order.amount * order.price).toString(), 'ether')
  const tokenGive = token.options.address
  const amountGive = web3.utils.toWei(order.amount,  'ether')

  exchange.methods.makeOrder_sOil(tokenGet, amountGet, tokenGive, amountGive).send({ from: account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking_sOil())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  })
}

export const makeSellOrderOracle_sOil = async (dispatch, exchange, token, web3, order, account) => {
  const tokenGive = token.options.address
  //const amountGet = web3.utils.toWei(order.amount, 'ether')
  const tokenGet = ETHER_ADDRESS
  const amountGive = web3.utils.toWei((order.amount ).toString(), 'ether')
  const aggregatorV3InterfaceABI = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr = "0x48c9FF5bFD7D12e3C511022A6E54fB1c5b8DC3Ea";
  
  const aggregatorV3InterfaceABI1 = [{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"description","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint80","name":"_roundId","type":"uint80"}],"name":"getRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"latestRoundData","outputs":[{"internalType":"uint80","name":"roundId","type":"uint80"},{"internalType":"int256","name":"answer","type":"int256"},{"internalType":"uint256","name":"startedAt","type":"uint256"},{"internalType":"uint256","name":"updatedAt","type":"uint256"},{"internalType":"uint80","name":"answeredInRound","type":"uint80"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"version","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
  const addr1 = "0x9326BFA02ADD2366b30bacB125260Af641031331";
  const priceFeed = new web3.eth.Contract(aggregatorV3InterfaceABI1, addr1);

  const pricesOil = new web3.eth.Contract(aggregatorV3InterfaceABI, addr);
  const sETH_price = await  priceFeed.methods.latestRoundData().call()


  const Oracle_price = await pricesOil.methods.latestRoundData().call()
  const sellAmount = (order.amount * (Oracle_price[1]).toString() / sETH_price[1].toString()) 
  const amountGet  = web3.utils.toWei(sellAmount.toString(), 'ether')
  console.log("nb of tokens to receive :", sellAmount)

  exchange.methods.makeOrder_sOil(tokenGet, amountGet, tokenGive, amountGive).send({ from:account})
  .on('transactionHash', (hash) => {
    dispatch(sellOrderMaking_sOil())
  })
  .on('error', (error) => {
    console.error(error)
    window.alert(`There was an error!`)
  })
  .on('confirmation', (reciept) => {
    window.location.reload()
  }) 
}














