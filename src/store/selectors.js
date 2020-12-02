import { get, groupBy, reject, maxBy, minBy } from 'lodash'
import { createSelector } from 'reselect'
import moment from 'moment'
import { ETHER_ADDRESS, GREEN, RED, ether, tokens } from '../helpers'

// TODO: Move me to helpers file
export const formatBalance = (balance) => {
  const precision = 100 // 2 decimal places

  balance = ether(balance)
  balance = Math.round(balance * precision) / precision // Use 2 decimal places

  return balance
}

const account = state => get(state, 'web3.account')
export const accountSelector = createSelector(account, a => a)

const web3 = state => get(state, 'web3.connection')
export const web3Selector = createSelector(web3, w => w)

const tokenLoaded = state => get(state, 'token.loaded', false)
export const tokenLoadedSelector = createSelector(tokenLoaded, tl => tl)

const token = state => get(state, 'token.contract')
export const tokenSelector = createSelector(token, t => t)

const sUSDLoaded = state => get(state, 'sUSD.loaded', false)
export const sUSDLoadedSelector = createSelector(sUSDLoaded, sl => sl)

const sUSD = state => get(state, 'sUSD.contract')
export const sUSDSelector = createSelector(sUSD, s => s)

const sETHLoaded = state => get(state, 'sETH.loaded', false)
export const sETHLoadedSelector = createSelector(sETHLoaded, sel => sel)

const sETH = state => get(state, 'sETH.contract')
export const sETHSelector = createSelector(sETH, se => se)

const sOilLoaded = state => get(state, 'sOil.loaded', false)
export const sOilLoadedSelector = createSelector(sOilLoaded, so => so)

const sOil = state => get(state, 'sOil.contract')
export const sOilSelector = createSelector(sOil, o => o)

const exchangeLoaded = state => get(state, 'exchange.loaded', false)
export const exchangeLoadedSelector = createSelector(exchangeLoaded, el => el)

const exchange = state => get(state, 'exchange.contract')
export const exchangeSelector = createSelector(exchange, e => e)

export const contractsLoadedSelector = createSelector(
  tokenLoaded,
  sUSDLoaded,
  sETHLoaded,
  sOilLoaded,
  exchangeLoaded,
  (tl, sl, sel, so, el) => (tl && sl && sel && so && el)
)


//ATX case 
//====================

// All Orders
const allOrdersLoaded = state => get(state, 'exchange.allOrders.loaded', false)
const allOrders = state => get(state, 'exchange.allOrders.data', [])

// Cancelled orders
const cancelledOrdersLoaded = state => get(state, 'exchange.cancelledOrders.loaded', false)
export const cancelledOrdersLoadedSelector = createSelector(cancelledOrdersLoaded, loaded => loaded)

const cancelledOrders = state => get(state, 'exchange.cancelledOrders.data', [])
export const cancelledOrdersSelector = createSelector(cancelledOrders, o => o)

// Filled Orders
const filledOrdersLoaded = state => get(state, 'exchange.filledOrders.loaded', false)
export const filledOrdersLoadedSelector = createSelector(filledOrdersLoaded, loaded => loaded)

const filledOrders = state => get(state, 'exchange.filledOrders.data', [])
export const filledOrdersSelector = createSelector(
  filledOrders,
  (orders) => {
    // Sort orders by date ascending for price comparison
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate the orders
    orders = decorateFilledOrders(orders)
    // Sort orders by date descending for display
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

const decorateFilledOrders = (orders) => {
  // Track previous order to compare history
  let previousOrder = orders[0]
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateFilledOrder(order, previousOrder)
      previousOrder = order // Update the previous order once it's decorated
      return order
    })
  )
}

const decorateOrder = (order) => {
  let etherAmount
  let tokenAmount

  if(order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive
    tokenAmount = order.amountGet
  } else {
    etherAmount = order.amountGet
    tokenAmount = order.amountGive
  }

  // Calculate token price to 5 decimal places
  const precision = 100000
  let tokenPrice = (etherAmount / tokenAmount)
  tokenPrice = Math.round(tokenPrice * precision) / precision

  return({
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ss a M/D')
  })
}

const decorateFilledOrder = (order, previousOrder) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder)
  })
}

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show green price if only one order exists
  if(previousOrder.id === orderId) {
    return GREEN
  }

  // Show green price if order price higher than previous order
  // Show red price if order price lower than previous order
  if(previousOrder.tokenPrice <= tokenPrice) {
    return GREEN // success
  } else {
    return RED // danger
  }
}

//sUSD case 
//===================

// All sUSD Orders
const allOrdersLoaded_USD = state => get(state, 'exchange.allOrders_USD.loaded', false)
const allOrders_USD = state => get(state, 'exchange.allOrders_USD.data', [])

// Cancelled orders
const cancelledOrdersLoaded_USD = state => get(state, 'exchange.cancelledOrders_USD.loaded', false)
export const cancelledOrdersLoadedSelector_USD = createSelector(cancelledOrdersLoaded_USD, loaded => loaded)

const cancelledOrders_USD = state => get(state, 'exchange.cancelledOrders_USD.data', [])
export const cancelledOrdersSelector_USD = createSelector(cancelledOrders_USD, o => o)

// Filled Orders
const filledOrdersLoaded_USD = state => get(state, 'exchange.filledOrders_USD.loaded', false)
export const filledOrdersLoadedSelector_USD = createSelector(filledOrdersLoaded_USD, loaded => loaded)

const filledOrders_USD = state => get(state, 'exchange.filledOrders_USD.data', [])
export const filledOrdersSelector_USD = createSelector(
  filledOrders_USD,
  (orders) => {
    // Sort orders by date ascending for price comparison
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate the orders
    orders = decorateFilledOrders(orders)
    // Sort orders by date descending for display
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

//sETH case 
//===================

// All sUSD Orders
const allOrdersLoaded_sETH = state => get(state, 'exchange.allOrders_sETH.loaded', false)
const allOrders_sETH = state => get(state, 'exchange.allOrders_sETH.data', [])

// Cancelled orders
const cancelledOrdersLoaded_sETH = state => get(state, 'exchange.cancelledOrders_sETH.loaded', false)
export const cancelledOrdersLoadedSelector_sETH = createSelector(cancelledOrdersLoaded_sETH, loaded => loaded)

const cancelledOrders_sETH = state => get(state, 'exchange.cancelledOrders_sETH.data', [])
export const cancelledOrdersSelector_sETH = createSelector(cancelledOrders_sETH, o => o)

// Filled Orders
const filledOrdersLoaded_sETH = state => get(state, 'exchange.filledOrders_sETH.loaded', false)
export const filledOrdersLoadedSelector_sETH = createSelector(filledOrdersLoaded_sETH, loaded => loaded)

const filledOrders_sETH = state => get(state, 'exchange.filledOrders_sETH.data', [])
export const filledOrdersSelector_sETH = createSelector(
  filledOrders_sETH,
  (orders) => {
    // Sort orders by date ascending for price comparison
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate the orders
    orders = decorateFilledOrders(orders)
    // Sort orders by date descending for display
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

//sOil case 
//===================

// All sOil Orders
const allOrdersLoaded_sOil = state => get(state, 'exchange.allOrders_sOil.loaded', false)
const allOrders_sOil = state => get(state, 'exchange.allOrders_sOil.data', [])

// Cancelled orders
const cancelledOrdersLoaded_sOil = state => get(state, 'exchange.cancelledOrders_sOil.loaded', false)
export const cancelledOrdersLoadedSelector_sOil = createSelector(cancelledOrdersLoaded_sOil, loaded => loaded)

const cancelledOrders_sOil = state => get(state, 'exchange.cancelledOrders_sOil.data', [])
export const cancelledOrdersSelector_sOil = createSelector(cancelledOrders_sOil, o => o)

// Filled Orders
const filledOrdersLoaded_sOil = state => get(state, 'exchange.filledOrders_sOil.loaded', false)
export const filledOrdersLoadedSelector_sOil = createSelector(filledOrdersLoaded_sOil, loaded => loaded)

const filledOrders_sOil = state => get(state, 'exchange.filledOrders_sOil.data', [])
export const filledOrdersSelector_sOil = createSelector(
  filledOrders_sOil,
  (orders) => {
    // Sort orders by date ascending for price comparison
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate the orders
    orders = decorateFilledOrders(orders)
    // Sort orders by date descending for display
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)





const openOrders = state => {
  const all = allOrders(state)
  const filled = filledOrders(state)
  const cancelled = cancelledOrders(state)

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some((o) => o.id.toString() === order.id.toString())
    const orderCancelled = cancelled.some((o) => o.id.toString() === order.id.toString())
    return(orderFilled || orderCancelled)
  })

  return openOrders
}

const openOrders_USD = state => {
  const all_USD = allOrders_USD(state)
  const filled_USD = filledOrders_USD(state)
  const cancelled_USD = cancelledOrders_USD(state)

  const openOrders_USD = reject(all_USD, (order) => {
    const orderFilled_USD = filled_USD.some((o) => o.id.toString() === order.id.toString())
    const orderCancelled_USD = cancelled_USD.some((o) => o.id.toString() === order.id.toString())
    return(orderFilled_USD || orderCancelled_USD)
  })

  return openOrders_USD
}

const openOrders_sETH = state => {
  const all_sETH = allOrders_sETH(state)
  const filled_sETH = filledOrders_sETH(state)
  const cancelled_sETH = cancelledOrders_sETH(state)

  const openOrders_sETH = reject(all_sETH, (order) => {
    const orderFilled_sETH = filled_sETH.some((o) => o.id.toString() === order.id.toString())
    const orderCancelled_sETH = cancelled_sETH.some((o) => o.id.toString() === order.id.toString())
    return(orderFilled_sETH || orderCancelled_sETH)
  })

  return openOrders_sETH
}

const openOrders_sOil = state => {
  const all_sOil = allOrders_sOil(state)
  const filled_sOil = filledOrders_sOil(state)
  const cancelled_sOil = cancelledOrders_sOil(state)

  const openOrders_sOil = reject(all_sOil, (order) => {
    const orderFilled_sOil = filled_sOil.some((o) => o.id.toString() === order.id.toString())
    const orderCancelled_sOil = cancelled_sOil.some((o) => o.id.toString() === order.id.toString())
    return(orderFilled_sOil || orderCancelled_sOil)
  })

  return openOrders_sOil
}


const orderBookLoaded = state => cancelledOrdersLoaded(state) && filledOrdersLoaded(state) && allOrdersLoaded(state)
export const orderBookLoadedSelector = createSelector(orderBookLoaded, loaded => loaded)

// Create the order book
export const orderBookSelector = createSelector(
  openOrders,
  (orders) => {
    // Decorate orders
    orders = decorateOrderBookOrders(orders)
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType')
    // Fetch buy orders
    const buyOrders = get(orders, 'buy', [])
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    // Fetch sell orders
    const sellOrders = get(orders, 'sell', [])
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    return orders
  }
)

const orderBookLoaded_USD = state => cancelledOrdersLoaded_USD(state) && filledOrdersLoaded_USD(state) && allOrdersLoaded_USD(state)
export const orderBookLoadedSelector_USD = createSelector(orderBookLoaded_USD, loaded => loaded)

// Create the order book
export const orderBookSelector_USD = createSelector(
  openOrders_USD,
  (orders) => {
    // Decorate orders
    orders = decorateOrderBookOrders(orders)
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType')
    // Fetch buy orders
    const buyOrders = get(orders, 'buy', [])
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    // Fetch sell orders
    const sellOrders = get(orders, 'sell', [])
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    return orders
  }
)

const orderBookLoaded_sETH = state => cancelledOrdersLoaded_sETH(state) && filledOrdersLoaded_sETH(state) && allOrdersLoaded_sETH(state)
export const orderBookLoadedSelector_sETH = createSelector(orderBookLoaded_sETH, loaded => loaded)

// Create the order book
export const orderBookSelector_sETH = createSelector(
  openOrders_sETH,
  (orders) => {
    // Decorate orders
    orders = decorateOrderBookOrders(orders)
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType')
    // Fetch buy orders
    const buyOrders = get(orders, 'buy', [])
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    // Fetch sell orders
    const sellOrders = get(orders, 'sell', [])
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    return orders
  }
)

const orderBookLoaded_sOil = state => cancelledOrdersLoaded_sOil(state) && filledOrdersLoaded_sOil(state) && allOrdersLoaded_sOil(state)
export const orderBookLoadedSelector_sOil = createSelector(orderBookLoaded_sOil, loaded => loaded)

// Create the order book
export const orderBookSelector_sOil = createSelector(
  openOrders_sOil,
  (orders) => {
    // Decorate orders
    orders = decorateOrderBookOrders(orders)
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType')
    // Fetch buy orders
    const buyOrders = get(orders, 'buy', [])
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    // Fetch sell orders
    const sellOrders = get(orders, 'sell', [])
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a,b) => b.tokenPrice - a.tokenPrice)
    }
    return orders
  }
)


const decorateOrderBookOrders = (orders) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateOrderBookOrder(order)
      return(order)
    })
  )
}

const decorateOrderBookOrder = (order) => {
  const orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderFillAction: orderType === 'buy' ? 'sell' : 'buy'
  })
}

export const myFilledOrdersLoadedSelector = createSelector(filledOrdersLoaded, loaded => loaded)

export const myFilledOrdersSelector = createSelector(
  account,
  filledOrders,
  (account, orders) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
)

export const myFilledOrdersLoadedSelector_USD = createSelector(filledOrdersLoaded_USD, loaded => loaded)

export const myFilledOrdersSelector_USD = createSelector(
  account,
  filledOrders_USD,
  (account, orders) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
)

export const myFilledOrdersLoadedSelector_sETH = createSelector(filledOrdersLoaded_sETH, loaded => loaded)

export const myFilledOrdersSelector_sETH = createSelector(
  account,
  filledOrders_sETH,
  (account, orders) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
)


export const myFilledOrdersLoadedSelector_sOil = createSelector(filledOrdersLoaded_sOil, loaded => loaded)

export const myFilledOrdersSelector_sOil = createSelector(
  account,
  filledOrders_sOil,
  (account, orders) => {
    // Find our orders
    orders = orders.filter((o) => o.user === account || o.userFill === account)
    // Sort by date ascending
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, account)
    return orders
  }
)


const decorateMyFilledOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateMyFilledOrder(order, account)
      return(order)
    })
  )
}

const decorateMyFilledOrder = (order, account) => {
  const myOrder = order.user === account

  let orderType
  if(myOrder) {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'
  } else {
    orderType = order.tokenGive === ETHER_ADDRESS ? 'sell' : 'buy'
  }

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED),
    orderSign: (orderType === 'buy' ? '+' : '-')
  })
}

export const myOpenOrdersLoadedSelector = createSelector(orderBookLoaded, loaded => loaded)

export const myOpenOrdersSelector = createSelector(
  account,
  openOrders,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account)
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders)
    // Sort orders by date descending
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

export const myOpenOrdersLoadedSelector_USD = createSelector(orderBookLoaded_USD, loaded => loaded)

export const myOpenOrdersSelector_USD = createSelector(
  account,
  openOrders_USD,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account)
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders)
    // Sort orders by date descending
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

export const myOpenOrdersLoadedSelector_sETH = createSelector(orderBookLoaded_sETH, loaded => loaded)

export const myOpenOrdersSelector_sETH = createSelector(
  account,
  openOrders_sETH,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account)
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders)
    // Sort orders by date descending
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

export const myOpenOrdersLoadedSelector_sOil = createSelector(orderBookLoaded_sOil, loaded => loaded)

export const myOpenOrdersSelector_sOil = createSelector(
  account,
  openOrders_sOil,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter((o) => o.user === account)
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders)
    // Sort orders by date descending
    orders = orders.sort((a,b) => b.timestamp - a.timestamp)
    return orders
  }
)

const decorateMyOpenOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order)
      order = decorateMyOpenOrder(order, account)
      return(order)
    })
  )
}

const decorateMyOpenOrder = (order, account) => {
  let orderType = order.tokenGive === ETHER_ADDRESS ? 'buy' : 'sell'

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED)
  })
}

export const priceChartLoadedSelector = createSelector(filledOrdersLoaded, loaded => loaded)

export const priceChartSelector = createSelector(
  filledOrders,
  (orders) => {
    // Sort orders by date ascending to compare history
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o))
    // Get last 2 order for final price & price change
    let secondLastOrder, lastOrder
    [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
    // get last order price
    const lastPrice = get(lastOrder, 'tokenPrice', 0)
    // get second last order price
    const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)

    return({
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
      series: [{
        data: buildGraphData(orders)
      }]
    })
  }
)

export const priceChartLoadedSelector_USD = createSelector(filledOrdersLoaded_USD, loaded => loaded)

export const priceChartSelector_USD = createSelector(
  filledOrders_USD,
  (orders) => {
    // Sort orders by date ascending to compare history
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o))
    // Get last 2 order for final price & price change
    let secondLastOrder, lastOrder
    [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
    // get last order price
    const lastPrice = get(lastOrder, 'tokenPrice', 0)
    // get second last order price
    const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)

    return({
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
      series: [{
        data: buildGraphData(orders)
      }]
    })
  }
)

export const priceChartLoadedSelector_sETH = createSelector(filledOrdersLoaded_sETH, loaded => loaded)

export const priceChartSelector_sETH = createSelector(
  filledOrders_sETH,
  (orders) => {
    // Sort orders by date ascending to compare history
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o))
    // Get last 2 order for final price & price change
    let secondLastOrder, lastOrder
    [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
    // get last order price
    const lastPrice = get(lastOrder, 'tokenPrice', 0)
    // get second last order price
    const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)

    return({
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
      series: [{
        data: buildGraphData(orders)
      }]
    })
  }
)


export const priceChartLoadedSelector_sOil = createSelector(filledOrdersLoaded_sOil, loaded => loaded)

export const priceChartSelector_sOil = createSelector(
  filledOrders_sOil,
  (orders) => {
    // Sort orders by date ascending to compare history
    orders = orders.sort((a,b) => a.timestamp - b.timestamp)
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o))
    // Get last 2 order for final price & price change
    let secondLastOrder, lastOrder
    [secondLastOrder, lastOrder] = orders.slice(orders.length - 2, orders.length)
    // get last order price
    const lastPrice = get(lastOrder, 'tokenPrice', 0)
    // get second last order price
    const secondLastPrice = get(secondLastOrder, 'tokenPrice', 0)

    return({
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ? '+' : '-'),
      series: [{
        data: buildGraphData(orders)
      }]
    })
  }
)

const buildGraphData = (orders) => {
  // Group the orders by hour for the graph
  orders = groupBy(orders, (o) => moment.unix(o.timestamp).startOf('hour').format())
  // Get each hour where data exists
  const hours = Object.keys(orders)
  // Build the graph series
  const graphData = hours.map((hour) => {
    // Fetch all the orders from current hour
    const group = orders[hour]
    // Calculate price values - open, high, low, close
    const open = group[0] // first order
    const high = maxBy(group, 'tokenPrice') // high price
    const low = minBy(group, 'tokenPrice') // low price
    const close = group[group.length - 1] // last order

    return({
      x: new Date(hour),
      y: [open.tokenPrice, high.tokenPrice, low.tokenPrice, close.tokenPrice]
    })
  })

  return graphData
}

const orderCancelling = state => get(state, 'exchange.orderCancelling', false)
export const orderCancellingSelector = createSelector(orderCancelling, status => status)

const orderCancelling_USD = state => get(state, 'exchange.orderCancelling_USD', false)
export const orderCancellingSelector_USD = createSelector(orderCancelling_USD, status => status)

const orderCancelling_sETH = state => get(state, 'exchange.orderCancelling_sETH', false)
export const orderCancellingSelector_sETH = createSelector(orderCancelling_sETH, status => status)

const orderCancelling_sOil = state => get(state, 'exchange.orderCancelling_sOil', false)
export const orderCancellingSelector_sOil = createSelector(orderCancelling_sOil, status => status)

const orderFilling = state => get(state, 'exchange.orderFilling', false)
export const orderFillingSelector = createSelector(orderFilling, status => status)

const orderFilling_USD = state => get(state, 'exchange.orderFilling_USD', false)
export const orderFillingSelector_USD = createSelector(orderFilling_USD, status => status)

const orderFilling_sETH = state => get(state, 'exchange.orderFilling_sETH', false)
export const orderFillingSelector_sETH = createSelector(orderFilling_sETH, status => status)

const orderFilling_sOil = state => get(state, 'exchange.orderFilling_sOil', false)
export const orderFillingSelector_sOil = createSelector(orderFilling_sOil, status => status)

// BALANCES
const balancesLoading = state => get(state, 'exchange.balancesLoading', true)
export const balancesLoadingSelector = createSelector(balancesLoading, status => status)

const etherBalance = state => get(state, 'web3.balance', 0)
export const etherBalanceSelector = createSelector(
  etherBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const tokenBalance = state => get(state, 'token.balance', 0)
export const tokenBalanceSelector = createSelector(
  tokenBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const sUSDBalance = state => get(state, 'sUSD.balance', 0)
export const sUSDBalanceSelector = createSelector(
  sUSDBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const sETHBalance = state => get(state, 'sETH.balance', 0)
export const sETHBalanceSelector = createSelector(
  sETHBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const sOilBalance = state => get(state, 'sOil.balance', 0)
export const sOilBalanceSelector = createSelector(
  sOilBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const exchangeEtherBalance = state => get(state, 'exchange.etherBalance', 0)
export const exchangeEtherBalanceSelector = createSelector(
  exchangeEtherBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const exchangeTokenBalance = state => get(state, 'exchange.tokenBalance', 0)
export const exchangeTokenBalanceSelector = createSelector(
  exchangeTokenBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const exchangesUSDBalance = state => get(state, 'exchange.sUSDBalance', 0)
export const exchangesUSDBalanceSelector = createSelector(
  exchangesUSDBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const exchangesETHBalance = state => get(state, 'exchange.sETHBalance', 0)
export const exchangesETHBalanceSelector = createSelector(
  exchangesETHBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const exchangesOilBalance = state => get(state, 'exchange.sOilBalance', 0)
export const exchangesOilBalanceSelector = createSelector(
  exchangesOilBalance,
  (balance) => {
    return formatBalance(balance)
  }
)

const etherDepositAmount = state => get(state, 'exchange.etherDepositAmount', null)
export const etherDepositAmountSelector = createSelector(etherDepositAmount, amount => amount)

const etherWithdrawAmount = state => get(state, 'exchange.etherWithdrawAmount', null)
export const etherWithdrawAmountSelector = createSelector(etherWithdrawAmount, amount => amount)


const tokenDepositAmount = state => get(state, 'exchange.tokenDepositAmount', null)
export const tokenDepositAmountSelector = createSelector(tokenDepositAmount, amount => amount)

const tokenWithdrawAmount = state => get(state, 'exchange.tokenWithdrawAmount', null)
export const tokenWithdrawAmountSelector = createSelector(tokenWithdrawAmount, amount => amount)

const sUSDDepositAmount = state => get(state, 'exchange.sUSDDepositAmount', null)
export const sUSDDepositAmountSelector = createSelector(sUSDDepositAmount, amount => amount)

const sUSDWithdrawAmount = state => get(state, 'exchange.sUSDWithdrawAmount', null)
export const sUSDWithdrawAmountSelector = createSelector(sUSDWithdrawAmount, amount => amount)

const sETHDepositAmount = state => get(state, 'exchange.sETHDepositAmount', null)
export const sETHDepositAmountSelector = createSelector(sETHDepositAmount, amount => amount)

const sETHWithdrawAmount = state => get(state, 'exchange.sETHWithdrawAmount', null)
export const sETHWithdrawAmountSelector = createSelector(sETHWithdrawAmount, amount => amount)

const sOilDepositAmount = state => get(state, 'exchange.sOilDepositAmount', null)
export const sOilDepositAmountSelector = createSelector(sOilDepositAmount, amount => amount)

const sOilWithdrawAmount = state => get(state, 'exchange.sOilWithdrawAmount', null)
export const sOilWithdrawAmountSelector = createSelector(sOilWithdrawAmount, amount => amount)


const buyOrder = state => get(state, 'exchange.buyOrder', {})
export const buyOrderSelector = createSelector(buyOrder, order => order)

const sellOrder = state => get(state, 'exchange.sellOrder', {})
export const sellOrderSelector = createSelector(sellOrder, order => order)

const buyOrder_USD = state => get(state, 'exchange.buyOrder_USD', {})
export const buyOrderSelector_USD = createSelector(buyOrder_USD, order => order)

const sellOrder_USD = state => get(state, 'exchange.sellOrder_USD', {})
export const sellOrderSelector_USD = createSelector(sellOrder_USD, order => order)

const buyOrderOracle_USD = state => get(state, 'exchange.buyOrderOracle_USD', {})
export const buyOrderOracleSelector_USD = createSelector(buyOrderOracle_USD, order => order)

const sellOrderOracle_USD = state => get(state, 'exchange.sellOrderOracle_USD', {})
export const sellOrderOracleSelector_USD = createSelector(sellOrderOracle_USD, order => order)

const buyOrder_sETH = state => get(state, 'exchange.buyOrder_sETH', {})
export const buyOrderSelector_sETH = createSelector(buyOrder_sETH, order => order)

const sellOrder_sETH = state => get(state, 'exchange.sellOrder_sETH', {})
export const sellOrderSelector_sETH = createSelector(sellOrder_sETH, order => order)

const buyOrder_sOil = state => get(state, 'exchange.buyOrder_sOil', {})
export const buyOrderSelector_sOil = createSelector(buyOrder_sOil, order => order)

const sellOrder_sOil = state => get(state, 'exchange.sellOrder_sOil', {})
export const sellOrderSelector_sOil = createSelector(sellOrder_sOil, order => order)

const buyOrderOracle_sOil = state => get(state, 'exchange.buyOrderOracle_sOil', {})
export const buyOrderOracleSelector_sOil = createSelector(buyOrderOracle_sOil, order => order)

const sellOrderOracle_sOil = state => get(state, 'exchange.sellOrderOracle_sOil', {})
export const sellOrderOracleSelector_sOil = createSelector(sellOrderOracle_sOil, order => order)












