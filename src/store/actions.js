// WEB3
export function web3Loaded(connection) {
  return {
    type: 'WEB3_LOADED',
    connection
  }
}

export function web3AccountLoaded(account) {
  return {
    type: 'WEB3_ACCOUNT_LOADED',
    account
  }
}

// TOKEN
export function tokenLoaded(contract) {
  return {
    type: 'TOKEN_LOADED',
    contract
  }
}

//sUSD
export function sUSDLoaded(contract) {
  return {
    type: 'sUSD_LOADED',
    contract
  }
}


//sETH
export function sETHLoaded(contract)  {
  return  {
    type: 'sETH_LOADED', 
    contract
  }
}

//sOil
export function sOilLoaded(contract)  {
  return  {
    type: 'sOil_LOADED', 
    contract
  }
}

// 
export function exchangeLoaded(contract) {
  return {
    type: 'EXCHANGE_LOADED',
    contract
  }
}

export function cancelledOrdersLoaded(cancelledOrders) {
  return {
    type: 'CANCELLED_ORDERS_LOADED',
    cancelledOrders
  }
}

export function cancelledOrdersLoaded_USD(cancelledOrders_USD) {
  return {
    type: 'CANCELLED_ORDERS_LOADED_USD',
    cancelledOrders_USD
  }
}

export function cancelledOrdersLoaded_sETH(cancelledOrders_sETH) {
  return {
    type: 'CANCELLED_ORDERS_LOADED_sETH', 
    cancelledOrders_sETH
  }
}

export function cancelledOrdersLoaded_sOil(cancelledOrders_sOil) {
  return {
    type: 'CANCELLED_ORDERS_LOADED_sOil', 
    cancelledOrders_sOil
  }
}


export function filledOrdersLoaded(filledOrders) {
  return {
    type: 'FILLED_ORDERS_LOADED',
    filledOrders
  }
}

export function filledOrdersLoaded_USD(filledOrders_USD) {
  return {
    type: 'FILLED_ORDERS_LOADED_USD',
    filledOrders_USD
  }
}

export function filledOrdersLoaded_sETH(filledOrders_sETH) {
  return {
    type: 'FILLED_ORDERS_LOADED_sETH',
    filledOrders_sETH
  }
}

export function filledOrdersLoaded_sOil(filledOrders_sOil) {
  return {
    type: 'FILLED_ORDERS_LOADED_sOil',
    filledOrders_sOil
  }
}

export function allOrdersLoaded(allOrders) {
  return {
    type: 'ALL_ORDERS_LOADED',
    allOrders
  }
}

export function allOrdersLoaded_USD(allOrders_USD) {
  return {
    type: 'ALL_ORDERS_LOADED_USD',
    allOrders_USD
  }
}

export function allOrdersLoaded_sETH(allOrders_sETH) {
  return {
    type: 'ALL_ORDERS_LOADED_sETH',
    allOrders_sETH
  }
}

export function allOrdersLoaded_sOil(allOrders_sOil) {
  return {
    type: 'ALL_ORDERS_LOADED_sOil',
    allOrders_sOil
  }
}

// Cancel Order
export function orderCancelling() {
  return {
    type: 'ORDER_CANCELLING'
  }
}

export function orderCancelling_USD() {
  return {
    type: 'ORDER_CANCELLING_USD'
  }
}

export function orderCancelling_sETH() {
  return {
    type: 'ORDER_CANCELLING_sETH'
  }
}

export function orderCancelling_sOil() {
  return {
    type: 'ORDER_CANCELLING_sOil'
  }
}

export function orderCancelled(order) {
  return {
    type: 'ORDER_CANCELLED',
    order
  }
}

// Fill Order
export function orderFilling() {
  return {
    type: 'ORDER_FILLING'
  }
}

export function orderFilling_USD() {
  return {
    type: 'ORDER_FILLING_USD'
  }
}

export function orderFilling_sETH() {
  return {
    type: 'ORDER_FILLING_sETH'
  }
}

export function orderFilling_sOil() {
  return {
    type: 'ORDER_FILLING_sOil'
  }
}

export function orderFilled(order) {
  return {
    type: 'ORDER_FILLED',
    order
  }
}

// Balances
export function etherBalanceLoaded(balance) {
  return {
    type: 'ETHER_BALANCE_LOADED',
    balance
  }
}

export function etherBalanceLoaded_USD(balance) {
  return {
    type: 'ETHER_BALANCE_LOADED_USD',
    balance
  }
}

export function tokenBalanceLoaded(balance) {
  return {
    type: 'TOKEN_BALANCE_LOADED',
    balance
  }
}

export function sUSDBalanceLoaded(balance) {
  return {
    type: 'sUSD_BALANCE_LOADED',
    balance
  }
}

export function sETHBalanceLoaded(balance) {
  return {
    type: 'sETH_BALANCE_LOADED',
    balance
  }
}

export function sOilBalanceLoaded(balance) {
  return {
    type: 'sOil_BALANCE_LOADED',
    balance
  }
}


export function exchangeEtherBalanceLoaded(balance) {
  return {
    type: 'EXCHANGE_ETHER_BALANCE_LOADED',
    balance
  }
}

export function exchangeTokenBalanceLoaded(balance) {
  return {
    type: 'EXCHANGE_TOKEN_BALANCE_LOADED',
    balance
  }
}

export function exchangesUSDBalanceLoaded(balance) {
  return {
    type: 'EXCHANGE_sUSD_BALANCE_LOADED',
    balance
  }
}


export function exchangesETHBalanceLoaded(balance) {
  return {
    type: 'EXCHANGE_sETH_BALANCE_LOADED',
    balance
  }
}

export function exchangesOilBalanceLoaded(balance) {
  return {
    type: 'EXCHANGE_sOil_BALANCE_LOADED',
    balance
  }
}

export function balancesLoaded() {
  return {
    type: 'BALANCES_LOADED'
  }
}

export function balancesLoading() {
  return {
    type: 'BALANCES_LOADING'
  }
}

export function etherDepositAmountChanged(amount) {
  return {
    type: 'ETHER_DEPOSIT_AMOUNT_CHANGED', 
    amount
  }
}

export function etherWithdrawAmountChanged(amount) {
  return {
    type: 'ETHER_WITHDRAW_AMOUNT_CHANGED', 
    amount
  }
}

export function tokenDepositAmountChanged(amount) {
  return{
    type: 'TOKEN_DEPOSIT_AMOUNT_CHANGED', 
    amount
  }
}

export function sUSDDepositAmountChanged(amount) {
  return{
    type: 'sUSD_DEPOSIT_AMOUNT_CHANGED', 
    amount
  }
}

export function sETHDepositAmountChanged(amount) {
  return{
    type: 'sETH_DEPOSIT_AMOUNT_CHANGED', 
    amount
  }
}

export function sOilDepositAmountChanged(amount) {
  return{
    type: 'sOil_DEPOSIT_AMOUNT_CHANGED', 
    amount
  }
}

export function tokenWithdrawAmountChanged(amount) {
  return{
    type: 'TOKEN_WITHDRAW_AMOUNT_CHANGED', 
    amount
  }
}

export function sUSDWithdrawAmountChanged(amount) {
  return{
    type: 'sUSD_WITHDRAW_AMOUNT_CHANGED', 
    amount
  }
}

export function sETHWithdrawAmountChanged(amount) {
  return{
    type: 'sETH_WITHDRAW_AMOUNT_CHANGED', 
    amount
  }
}

export function sOilWithdrawAmountChanged(amount) {
  return{
    type: 'sOil_WITHDRAW_AMOUNT_CHANGED', 
    amount
  }
}

//BUY ORDER
export function buyOrderAmountChanged(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED',
    amount
  }
}


export function buyOrderPriceChanged(price){
  return {
    type: 'BUY_ORDER_PRICE_CHANGED',
    price
  }
}


export function buyOrderAmountChanged_USD(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED_USD',
    amount
  }
}

export function buyOrderOracleAmountChanged_USD(amount) {
  return {
    type: 'BUY_ORDER_ORACLE_AMOUNT_CHANGED_USD',
    amount
  }
}


export function buyOrderPriceChanged_USD(price){
  return {
    type: 'BUY_ORDER_PRICE_CHANGED_USD',
    price
  }
}

export function buyOrderAmountChanged_sETH(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED_sETH',
    amount
  }
}

export function buyOrderPriceChanged_sETH(price){
  return {
    type: 'BUY_ORDER_PRICE_CHANGED_sETH',
    price
  }
}


export function buyOrderAmountChanged_sOil(amount) {
  return {
    type: 'BUY_ORDER_AMOUNT_CHANGED_sOil',
    amount
  }
}

export function buyOrderOracleAmountChanged_sOil(amount) {
  return {
    type: 'BUY_ORDER_ORACLE_AMOUNT_CHANGED_sOil',
    amount
  }
}


export function buyOrderPriceChanged_sOil(price){
  return {
    type: 'BUY_ORDER_PRICE_CHANGED_sOil',
    price
  }
}



export function buyOrderMaking(price) {
  return{
    type: 'BUY_ORDER_MAKING'
  }
}

export function buyOrderMaking_USD(price) {
  return{
    type: 'BUY_ORDER_MAKING_USD'
  }
}

export function buyOrderMaking_sETH(price) {
  return{
    type: 'BUY_ORDER_MAKING_sETH'
  }
}

export function buyOrderMaking_sOil(price) {
  return{
    type: 'BUY_ORDER_MAKING_sOil'
  }
}


//Generic Order
export function orderMade(order) {
  return{
    type: 'ORDER_MADE',
    order
  }
}

//Sell Order
export function sellOrderAmountChanged(amount) {
  return{
    type: 'SELL_ORDER_AMOUNT_CHANGED', 
    amount
  }
}

export function sellOrderPriceChanged(price){
  return {
    type: 'SELL_ORDER_PRICE_CHANGED',
    price
  }
}

export function sellOrderAmountChanged_USD(amount) {
  return{
    type: 'SELL_ORDER_AMOUNT_CHANGED_USD', 
    amount
  }
}

export function sellOrderOracleAmountChanged_USD(amount) {
  return {
    type: 'SELL_ORDER_ORACLE_AMOUNT_CHANGED_USD',
    amount
  }
}

export function sellOrderPriceChanged_USD(price){
  return {
    type: 'SELL_ORDER_PRICE_CHANGED_USD',
    price
  }
}

export function sellOrderAmountChanged_sETH(amount) {
  return{
    type: 'SELL_ORDER_AMOUNT_CHANGED_sETH', 
    amount
  }
}

export function sellOrderPriceChanged_sETH(price){
  return {
    type: 'SELL_ORDER_PRICE_CHANGED_sETH',
    price
  }
}


export function sellOrderAmountChanged_sOil(amount) {
  return{
    type: 'SELL_ORDER_AMOUNT_CHANGED_sOil', 
    amount
  }
}

export function sellOrderOracleAmountChanged_sOil(amount) {
  return {
    type: 'SELL_ORDER_ORACLE_AMOUNT_CHANGED_sOil',
    amount
  }
}

export function sellOrderPriceChanged_sOil(price){
  return {
    type: 'SELL_ORDER_PRICE_CHANGED_sOil',
    price
  }
}


export function sellOrderMaking(price) {
  return{
    type: 'SELL_ORDER_MAKING'
  }
}

export function sellOrderMaking_USD(price) {
  return{
    type: 'SELL_ORDER_MAKING_USD'
  }
}

export function sellOrderMaking_sETH(price) {
  return{
    type: 'SELL_ORDER_MAKING_sETH'
  }
}

export function sellOrderMaking_sOil(price) {
  return{
    type: 'SELL_ORDER_MAKING_sOil'
  }
}






























