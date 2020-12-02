import React, {Component} from 'react'
import  { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import Spinner from './Spinner'
import {
	exchangeSelector, 
	sUSDSelector, 
	accountSelector, 
	web3Selector, 
	buyOrderSelector_USD,
	sellOrderSelector_USD,
	buyOrderOracleSelector_USD,
	sellOrderOracleSelector_USD,	
} from '../store/selectors'

import {
	buyOrderAmountChanged_USD, 
	buyOrderPriceChanged_USD, 
	sellOrderAmountChanged_USD,  
	sellOrderPriceChanged_USD,
	buyOrderOracleAmountChanged_USD, 
	sellOrderOracleAmountChanged_USD, 
} from '../store/actions'

import {
	makeBuyOrder_USD, 
	makeSellOrder_USD,
	makeBuyOrderOracle_USD,
	makeSellOrderOracle_USD

} from '../store/interaction'

const showForm = (props) => {
	const {
		dispatch, 
		buyOrder,
		showBuyTotal,
		exchange,
		token,
		web3,
		account,
		sellOrder,
		buyOrderOracle,
		sellOrderOracle,
		showSellTotal
	} = props

	return(
		<Tabs defaultActiveKey= "buy" className= "bg-dark text-white">
			<Tab eventKey= "buy" title= "Buy" className="bg-dark">
				<form onSubmit= {(event) => {
					event.preventDefault()
					makeBuyOrder_USD(dispatch, exchange, token, web3, buyOrder, account)
				}}>
				<div className= "form-group small">
				<label> Buy Amount (sUSD)</label>
				<div className="input-group">
					<input
						type= "text"
						className= "form-control form-control-sm bg-dark text-white"
						placeholder= "Buy Amount"
						onChange={(e) => dispatch( buyOrderAmountChanged_USD(e.target.value) )}
						required
					/>
				</div>
				</div>
				<div className= "form-group small">
					<label> Buy Price </label>
						<div className= "input-group">
							<input
								type= "text"
								className = "form-control form-control-sm bg-dark text-white"
								placeholder= "Buy Price"
								onChange= {(e) => dispatch( buyOrderPriceChanged_USD( e.target.value) )}
								required
							/>
						</div>
					</div>
					<button type= "submit" className= "btn btn-primary btn-sm btn-block">Buy Order</button>
					{showBuyTotal ? <small> Total: {buyOrder.amount * buyOrder.price} ETH </small>: null}
				</form>

			</Tab>

			<Tab eventKey= "sell" title= "Sell" className="bg-dark">

				<form onSubmit= {(event) => {
					event.preventDefault()
					makeSellOrder_USD(dispatch, exchange, token, web3, sellOrder, account)
				}}>
				<div className= "form-group small">
					<label> Sell Amount (sUSD)</label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "Sell amount"
							onChange= {(e) => dispatch( sellOrderAmountChanged_USD( e.target.value) )}
							required
						/>
					</div>
				</div>
				<div className= "form-group small">
					<label> Sell Price </label>
					<div className= "input-group">
						<input 
							type= "text"
							className= "form-control from-control-sm bg-dark text-white"
							placeholder= "Sell Price"
							onChange= {(e) => dispatch( sellOrderPriceChanged_USD(e.target.value) )}
							required
						/>
					</div>
				</div>
				<button type= "submit" className= "btn btn-primary btn-sm btn-block">Sell orders</button>
				{ showSellTotal ? <small> Total : {sellOrder.amount * sellOrder.price} ETH</small> : null}
				</form>

			</Tab>

			<Tab eventKey= "market" title= "Market" className="bg-dark">

				<form onSubmit= {(event) => {
					event.preventDefault()
					makeBuyOrderOracle_USD(dispatch, exchange, token, web3, buyOrderOracle, account)
				}}>
				<div className= "form-group small">
					<label> Buy sUSD </label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "sUSD amount ( in  ETH )"
							onChange= {(e) => dispatch( buyOrderOracleAmountChanged_USD( e.target.value) )}
							required
						/>
					</div>
				</div>
				<button type= "submit" className= "btn btn-primary btn-sm btn-block">Buy market</button>
				<br />
				</form>

				<form onSubmit= {(event) => {
					event.preventDefault()
					makeSellOrderOracle_USD(dispatch, exchange, token, web3, sellOrderOracle, account)
				}}>
				<div className= "form-group small">
					<label> Sell sUSD </label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "sUSD amount"
							onChange= {(e) => dispatch( sellOrderOracleAmountChanged_USD( e.target.value) )}
							required
						/>
					</div>
				</div>
				<button type= "submit" className= "btn btn-primary btn-sm btn-block">Sell market</button>

				</form>

			</Tab>

		</Tabs>
	)
}

class NewOrder_USD extends Component {

	render() {
		return(
			<div className= 'Exchange-Box1-1'>
			<div className= "card bg-dark text-white">
				<div className="card-header">
					New Order
				</div>
				<div className= "card-body">
					{this.props.showForm ? showForm(this.props) : <Spinner />}
				</div>
			</div>
			</div>
		)
	}
}

function mapStateToProps(state){
	const buyOrder = buyOrderSelector_USD(state)
	const sellOrder = sellOrderSelector_USD(state)
	const buyOrderOracle = buyOrderOracleSelector_USD(state)
	const sellOrderOracle = sellOrderOracleSelector_USD(state)

	return{
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: sUSDSelector(state),
		web3: web3Selector(state),
		buyOrder, 
		sellOrder,
		buyOrderOracle,
		sellOrderOracle,
		showForm: !buyOrder.making && !sellOrder.making,
		showBuyTotal: buyOrder.amount && buyOrder.price,
		showSellTotal: sellOrder.amount && sellOrder.price
	}
}

export default connect(mapStateToProps)(NewOrder_USD)









