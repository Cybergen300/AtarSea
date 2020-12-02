import { combineReducers } from 'redux';

function web3(state = {}, action) {
  switch (action.type) {
    case 'WEB3_LOADED':
      return { ...state,  connection: action.connection }
    case 'WEB3_ACCOUNT_LOADED':
      return { ...state, account: action.account }
    case 'ETHER_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function token(state = {}, action) {
  switch (action.type) {
    case 'TOKEN_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'TOKEN_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function sUSD(state = {}, action) {
  switch (action.type) {
    case 'sUSD_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'sUSD_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function sETH(state = {}, action) {
  switch (action.type) {
    case 'sETH_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'sETH_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function sOil(state = {}, action) {
  switch (action.type) {
    case 'sOil_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'sOil_BALANCE_LOADED':
      return { ...state, balance: action.balance }
    default:
      return state
  }
}

function exchange(state = {}, action) {
  let index, data

  switch (action.type) {
    case 'EXCHANGE_LOADED':
      return { ...state, loaded: true, contract: action.contract }
    case 'CANCELLED_ORDERS_LOADED':
      return { ...state, cancelledOrders: { loaded: true, data: action.cancelledOrders } }
    case 'FILLED_ORDERS_LOADED':
      return { ...state, filledOrders: { loaded: true, data: action.filledOrders } }
    case 'ALL_ORDERS_LOADED':
      return { ...state, allOrders: { loaded: true, data: action.allOrders } }
    
    case 'CANCELLED_ORDERS_LOADED_USD':
      return { ...state, cancelledOrders_USD: { loaded: true, data: action.cancelledOrders_USD } }
    case 'FILLED_ORDERS_LOADED_USD':
      return { ...state, filledOrders_USD: { loaded: true, data: action.filledOrders_USD } }
    case 'ALL_ORDERS_LOADED_USD':
      return { ...state, allOrders_USD: { loaded: true, data: action.allOrders_USD } }

    case 'CANCELLED_ORDERS_LOADED_sETH':
      return { ...state, cancelledOrders_sETH: { loaded: true, data: action.cancelledOrders_sETH } }
    case 'FILLED_ORDERS_LOADED_sETH':
      return { ...state, filledOrders_sETH: { loaded: true, data: action.filledOrders_sETH } }
    case 'ALL_ORDERS_LOADED_sETH':
      return { ...state, allOrders_sETH: { loaded: true, data: action.allOrders_sETH } }

    case 'CANCELLED_ORDERS_LOADED_sOil':
      return { ...state, cancelledOrders_sOil: { loaded: true, data: action.cancelledOrders_sOil } }
    case 'FILLED_ORDERS_LOADED_sOil':
      return { ...state, filledOrders_sOil: { loaded: true, data: action.filledOrders_sOil } }
    case 'ALL_ORDERS_LOADED_sOil':
      return { ...state, allOrders_sOil: { loaded: true, data: action.allOrders_sOil} }

    case 'ORDER_CANCELLING':
      return { ...state, orderCancelling: true }
    case 'ORDER_CANCELLING_USD':
      return { ...state, orderCancelling_USD: true }
    case 'ORDER_CANCELLING_sETH':
      return { ...state, orderCancelling_sETH: true }
    case 'ORDER_CANCELLING_sOil':
      return { ...state, orderCancelling_sOil: true }
    case 'ORDER_CANCELLED':
      return {
        ...state,
        orderCancelling: false,
        cancelledOrders: {
          ...state.cancelledOrders,
          data: [
            ...state.cancelledOrders.data,
            action.order
          ]
        }
      }
    case 'ORDER_FILLED':
      // Prevent duplicate orders
      index = state.filledOrders.data.findIndex(order => order.id === action.order.id);

      if(index === -1) {
        data = [...state.filledOrders.data, action.order]
      } else {
        data = state.filledOrders.data
      }

      return {
        ...state,
        orderFilling: false,
        filledOrders: {
          ...state.filledOrders,
          data
        }
      }

    case 'ORDER_FILLING':
      return { ...state, orderFilling: true }
    case 'ORDER_FILLING_USD':
      return { ...state, orderFilling_USD: true }
    case 'ORDER_FILLING_sETH':
      return { ...state, orderFilling_sETH: true }
    case 'ORDER_FILLING_sOil':
      return { ...state, orderFilling_sOil: true }

    case 'EXCHANGE_ETHER_BALANCE_LOADED':
      return { ...state, etherBalance: action.balance }
    case 'EXCHANGE_TOKEN_BALANCE_LOADED':
      return { ...state, tokenBalance: action.balance }
    case 'EXCHANGE_sUSD_BALANCE_LOADED':
      return { ...state, sUSDBalance: action.balance }
    case 'EXCHANGE_sETH_BALANCE_LOADED':
      return { ...state, sETHBalance: action.balance }
    case 'EXCHANGE_sOil_BALANCE_LOADED':
      return { ...state, sOilBalance: action.balance }


    case 'BALANCES_LOADING':
      return { ...state, balancesLoading: true }
    case 'BALANCES_LOADED':
      return { ...state, balancesLoading: false }
     case 'ETHER_DEPOSIT_AMOUNT_CHANGED': 
      return {...state, etherDepositAmount: action.amount}
     case 'ETHER_WITHDRAW_AMOUNT_CHANGED': 
      return {...state, etherWithdrawAmount: action.amount}
     case 'TOKEN_DEPOSIT_AMOUNT_CHANGED':
      return  {...state, tokenDepositAmount: action.amount}
     case 'TOKEN_WITHDRAW_AMOUNT_CHANGED':
      return {...state, tokenWithdrawAmount: action.amount}
    
     case 'sUSD_DEPOSIT_AMOUNT_CHANGED':
      return  {...state, sUSDDepositAmount: action.amount}
     case 'sUSD_WITHDRAW_AMOUNT_CHANGED':
      return {...state, sUSDWithdrawAmount: action.amount}

     case 'sETH_DEPOSIT_AMOUNT_CHANGED':
      return  {...state, sETHDepositAmount: action.amount}
     case 'sETH_WITHDRAW_AMOUNT_CHANGED':
      return {...state, sETHWithdrawAmount: action.amount}

     case 'sOil_DEPOSIT_AMOUNT_CHANGED':
      return  {...state, sOilDepositAmount: action.amount}
     case 'sOil_WITHDRAW_AMOUNT_CHANGED':
      return {...state, sOilWithdrawAmount: action.amount}

     case 'BUY_ORDER_AMOUNT_CHANGED': 
      return {...state, buyOrder: { ...state.buyOrder, amount: action.amount}}
     case 'BUY_ORDER_PRICE_CHANGED':
      return{ ...state, buyOrder: { ...state.buyOrder, price: action.price}}
     case 'BUY_ORDER_MAKING': 
      return {...state, buyOrder: { ...state.buyOrder, amount: null, price: null, making: true}}
     
     case 'BUY_ORDER_AMOUNT_CHANGED_USD': 
      return {...state, buyOrder_USD: { ...state.buyOrder_USD, amount: action.amount}}
     case 'BUY_ORDER_PRICE_CHANGED_USD':
      return{ ...state, buyOrder_USD: { ...state.buyOrder_USD, price: action.price}}
     case 'BUY_ORDER_MAKING_USD': 
      return {...state, buyOrder_USD: { ...state.buyOrder_USD, amount: null, price: null, making: true}}

     case 'BUY_ORDER_ORACLE_AMOUNT_CHANGED_USD': 
      return {...state, buyOrderOracle_USD: { ...state.buyOrderOracle_USD, amount: action.amount}}

     case 'BUY_ORDER_AMOUNT_CHANGED_sETH': 
      return {...state, buyOrder_sETH: { ...state.buyOrder_sETH, amount: action.amount}}
     case 'BUY_ORDER_PRICE_CHANGED_sETH':
      return{ ...state, buyOrder_sETH: { ...state.buyOrder_sETH, price: action.price}}
     case 'BUY_ORDER_MAKING_sETH': 
      return {...state, buyOrder_sETH: { ...state.buyOrder_sETH, amount: null, price: null, making: true}}

      case 'BUY_ORDER_AMOUNT_CHANGED_sOil': 
      return {...state, buyOrder_sOil: { ...state.buyOrder_sOil, amount: action.amount}}
     case 'BUY_ORDER_PRICE_CHANGED_sOil':
      return{ ...state, buyOrder_sOil: { ...state.buyOrder_sOil, price: action.price}}
     case 'BUY_ORDER_MAKING_sOil': 
      return {...state, buyOrder_sOil: { ...state.buyOrder_sOil, amount: null, price: null, making: true}}

     case 'BUY_ORDER_ORACLE_AMOUNT_CHANGED_sOil': 
      return {...state, buyOrderOracle_sOil: { ...state.buyOrderOracle_sOil, amount: action.amount}}

     case 'ORDER_MADE': 
      //Prevent duplicate  orders
      index = state.allOrders.data.findIndex(order  => order.id === action.order.id);

      if(index === -1) {
        data = [...state.allOrders.data, action.order]
      } else {
        data = state.allOrders.data
      }

      return  {
        ...state, 
        allOrders: {
          ...state.allOrders,
          data
        },
        buyOrder: {
          ...state.buyOrder,
          making: false
        },
        sellOrder: {
          ...state.sellOrder, 
          making: false
        }
      }

    case 'SELL_ORDER_AMOUNT_CHANGED': 
      return {...state, sellOrder: { ...state.sellOrder, amount: action.amount}}
    case 'SELL_ORDER_PRICE_CHANGED':
      return { ...state, sellOrder: { ...state.sellOrder, price: action.price}}
    case 'SELL_ORDER_MAKING': 
      return { ...state, sellOrder: { ...state.sellOrder, amount: null, price: null, making: true}}

    case 'SELL_ORDER_AMOUNT_CHANGED_USD': 
      return {...state, sellOrder_USD: { ...state.sellOrder_USD, amount: action.amount}}
    case 'SELL_ORDER_PRICE_CHANGED_USD':
      return { ...state, sellOrder_USD: { ...state.sellOrder_USD, price: action.price}}
    case 'SELL_ORDER_MAKING_USD': 
      return { ...state, sellOrder_USD: { ...state.sellOrder_USD, amount: null, price: null, making: true}}
     case 'SELL_ORDER_ORACLE_AMOUNT_CHANGED_USD': 
      return {...state, sellOrderOracle_USD: { ...state.sellOrderOracle_USD, amount: action.amount}}

    case 'SELL_ORDER_AMOUNT_CHANGED_sETH': 
      return {...state, sellOrder_sETH: { ...state.sellOrder_sETH, amount: action.amount}}
    case 'SELL_ORDER_PRICE_CHANGED_sETH':
      return { ...state, sellOrder_sETH: { ...state.sellOrder_sETH, price: action.price}}
    case 'SELL_ORDER_MAKING_sETH': 
      return { ...state, sellOrder_sETH: { ...state.sellOrder_sETH, amount: null, price: null, making: true}}

    case 'SELL_ORDER_AMOUNT_CHANGED_sOil': 
      return {...state, sellOrder_sOil: { ...state.sellOrder_sOil, amount: action.amount}}
    case 'SELL_ORDER_PRICE_CHANGED_sOil':
      return { ...state, sellOrder_sOil: { ...state.sellOrder_sOil, price: action.price}}
    case 'SELL_ORDER_MAKING_sOil': 
      return { ...state, sellOrder_sOil: { ...state.sellOrder_sOil, amount: null, price: null, making: true}}
     case 'SELL_ORDER_ORACLE_AMOUNT_CHANGED_sOil': 
      return {...state, sellOrderOracle_sOil: { ...state.sellOrderOracle_sOil, amount: action.amount}}

    default: 
      return state
  }
}


const rootReducer = combineReducers({
  web3, 
  token, 
  sUSD,
  sETH,
  sOil,
  exchange
})

export default rootReducer


