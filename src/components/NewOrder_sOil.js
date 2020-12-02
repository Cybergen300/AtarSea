import React, {Component} from 'react'
import  { connect } from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import Spinner from './Spinner'
import {
	exchangeSelector, 
	sOilSelector, 
	accountSelector, 
	web3Selector, 
	buyOrderSelector_sOil,
	sellOrderSelector_sOil,
	buyOrderOracleSelector_sOil,
	sellOrderOracleSelector_sOil,	
} from '../store/selectors'

import {
	buyOrderAmountChanged_sOil, 
	buyOrderPriceChanged_sOil, 
	sellOrderAmountChanged_sOil,  
	sellOrderPriceChanged_sOil,
	buyOrderOracleAmountChanged_sOil, 
	sellOrderOracleAmountChanged_sOil, 
} from '../store/actions'

import {
	makeBuyOrder_sOil, 
	makeSellOrder_sOil,
	makeBuyOrderOracle_sOil,
	makeSellOrderOracle_sOil

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
					makeBuyOrder_sOil(dispatch, exchange, token, web3, buyOrder, account)
				}}>
				<div className= "form-group small">
				<label> Buy Amount (sOil)</label>
				<div className="input-group">
					<input
						type= "text"
						className= "form-control form-control-sm bg-dark text-white"
						placeholder= "Buy Amount"
						onChange={(e) => dispatch( buyOrderAmountChanged_sOil(e.target.value) )}
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
								onChange= {(e) => dispatch( buyOrderPriceChanged_sOil( e.target.value) )}
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
					makeSellOrder_sOil(dispatch, exchange, token, web3, sellOrder, account)
				}}>
				<div className= "form-group small">
					<label> Sell Amount (sOil)</label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "Sell amount"
							onChange= {(e) => dispatch( sellOrderAmountChanged_sOil( e.target.value) )}
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
							onChange= {(e) => dispatch( sellOrderPriceChanged_sOil(e.target.value) )}
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
					makeBuyOrderOracle_sOil(dispatch, exchange, token, web3, buyOrderOracle, account)
				}}>
				<div className= "form-group small">
					<label> Buy sOil </label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "sOil amount ( in  ETH )"
							onChange= {(e) => dispatch( buyOrderOracleAmountChanged_sOil( e.target.value) )}
							required
						/>
					</div>
				</div>
				<button type= "submit" className= "btn btn-primary btn-sm btn-block">Buy market</button>
				<br />
				</form>

				<form onSubmit= {(event) => {
					event.preventDefault()
					makeSellOrderOracle_sOil(dispatch, exchange, token, web3, sellOrderOracle, account)
				}}>
				<div className= "form-group small">
					<label> Sell sOil </label>
					<div className= "input-group">
						<input
							type= "text"
							className= "form-control form-control-sm bg-dark text-white"
							placeholder= "sOil amount"
							onChange= {(e) => dispatch( sellOrderOracleAmountChanged_sOil( e.target.value) )}
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

class NewOrder_sOil extends Component {

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
	const buyOrder = buyOrderSelector_sOil(state)
	const sellOrder = sellOrderSelector_sOil(state)
	const buyOrderOracle = buyOrderOracleSelector_sOil(state)
	const sellOrderOracle = sellOrderOracleSelector_sOil(state)

	return{
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: sOilSelector(state),
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

export default connect(mapStateToProps)(NewOrder_sOil)









