import React , {Component,  Fragment} from 'react'
import { connect } from 'react-redux'
import {NavLink, Switch, Route} from 'react-router-dom'
import './Exchange.css'
import Trade from './Trade.js'
import Trade_USD from './Trade_USD.js'
import Trade_sETH from './trade_sETH.js'
import Trade_sOil from './Trade_sOil.js'
import {exchangeSelector} from '../store/selectors'
import { loadAllOrders, subscribeToEvents } from '../store/interaction'
import OrderBook from './Orderbook.js'
import OrderBook_USD from './Orderbook_USD.js'
import OrderBook_sETH from './Orderbook_sETH.js'
import OrderBook_sOil from './Orderbook_sOil.js'
import PriceChart from './PriceChart.js'
import PriceChart_USD from './PriceChart_USD.js'
import PriceChart_sETH from './PriceChart_sETH.js'
import PriceChart_sOil from './PriceChart_sOil.js'
import MyTransactions from './MyTransactions.js'
import MyTransactions_USD from './MyTransactions_USD.js'
import MyTransactions_sETH from './MyTransactions_sETH.js'
import MyTransactions_sOil from './MyTransactions_sOil.js'
import NewOrder from './NewOrder.js'
import NewOrder_USD from './NewOrder_USD.js'
import NewOrder_sETH from './NewOrder_sETH.js'
import NewOrder_sOil from './NewOrder_sOil.js'
import Select from 'react-select';

const crypto = [
					{value: 0, label: 'DAPP'}, 
					{value : 1,  label: 'sETH'},
					{value: 2, label: 'sUSD'},
					{value: 3,  label: 'sOIL'}
				]
const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: '#292b2c' }),
  singleValue: (styles) => ({ ...styles, color : 'white'}),
 }

class Exchange extends React.Component{

	state = {
        currentForm: crypto[0]
     }


  async componentWillMount() {
    this.loadBlockchainData(this.props)

  }

  async  loadBlockchainData(props){
  	const {dispatch,  exchange} = props
  	await loadAllOrders(exchange, dispatch)

  	console.log("coucou:", this.state.currentForm.label)
   }

 	handleChange = currentForm => {
  	this.setState({currentForm})
  	console.log('Option selected:', currentForm.label)
  }

	render() {
    let content, content_OrderBook, content_Trades, content_MyTransactions, content_Graph, content_NewOrder
	const {currentForm} = this.state

    if (this.state.currentForm.label === 'DAPP'){
      //content = <NewOrder />
      content_OrderBook = <OrderBook />
      content_Trades = <Trade />
      content_MyTransactions = <MyTransactions/>
      content_Graph = <PriceChart />
      content_NewOrder = <NewOrder />
    }
    else if (this.state.currentForm.label === 'sETH'){
      content_Trades = <Trade_sETH />
      content_MyTransactions = <MyTransactions_sETH/>
      content_OrderBook = <OrderBook_sETH />
      content_Graph = <PriceChart_sETH />
      content_NewOrder = <NewOrder_sETH />
    }
    else if (this.state.currentForm.label === 'sUSD'){
      //content = <NewOrder />
      content_OrderBook = <OrderBook_USD />
      content_Trades = <Trade_USD />
      content_MyTransactions = <MyTransactions_USD/>
      content_Graph = <PriceChart_USD />
      content_NewOrder = <NewOrder_USD />
    }
    else if (this.state.currentForm.label === 'sOIL'){
      content_Trades = <Trade_sOil />
      content_MyTransactions = <MyTransactions_sOil/>
      content_OrderBook = <OrderBook_sOil />
      content_Graph = <PriceChart_sOil />
      content_NewOrder = <NewOrder_sOil />
    }


		return(
			<div className = 'Exchange-Container'>
				<div className = 'Exchange-Box1'>
					<div id = 'content' className= 'Exchange-Box1-1'>
						{content_NewOrder}
					</div>
					<Fragment>
						<Select
							className= "basic-single"
							defaultValue = {crypto[0]}
							value = {currentForm}
							options = {crypto} 
							styles = {colourStyles}
							onChange = {this.handleChange}/>
					</Fragment>
					<div className= 'Exchange-Box1-2'>
						{content_Trades}
					</div>
				</div>

				<div className = 'Exchange-Box2'>
					<div className = 'Exchange-Box2-1'>
						{content_Graph}
					</div>
					<div className= 'Exchange-Box2-2'>
						{content_MyTransactions}
					</div>
				</div>

				<div className = 'Exchange-Box3'>
					<div id =  'content_OrderBook' className = 'Exchange-Box3-1'>
						{content_OrderBook} 
					</div>
				</div>

				
			</div>
		)
	}
}

function mapStateToProps(state) {
  return {
  	exchange: exchangeSelector(state)
  }
}

export default connect(mapStateToProps)(Exchange)