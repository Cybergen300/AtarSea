import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Tabs, Tab} from 'react-bootstrap'
import{
	myFilledOrdersLoadedSelector_sOil, 
	myFilledOrdersSelector_sOil, 
	myOpenOrdersLoadedSelector_sOil,
	myOpenOrdersSelector_sOil,
	exchangeSelector, 
	accountSelector, 
	orderCancellingSelector_sOil
}  from '../store/selectors'
import {cancelOrder_sOil} from '../store/interaction'

const  showMyFilledOrders = (props) => {
	const { myFilledOrders} = props
	return(
		<tbody>
		{ myFilledOrders.map((order) => {
			return(
				<tr  key = {order.id}>
					<td className= "text-muted">{order.formattedTimestamp}</td>
					<td className= {`text-${order.orderTypeClass}`}>{order.orderSign}{order.tokenAmount}</td>
					<td className= {`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
				</tr>
			)
		}) }
		</tbody>
	)
}

const showMyOpenOrders = (props) => {
	const { myOpenOrders, dispatch, exchange, account} = props
	return(
		<tbody>
			{myOpenOrders.map((order) => {
				return(
					<tr key= {order.id}>
						<td className= {`text-${order.orderTypeClass}`}>{order.tokenAmount}</td>
						<td className= {`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
						<td 
							className= "text-muted cancel-order"
							onClick= {(e) => {
								cancelOrder_sOil(dispatch, exchange, order, account)
							}}
						>X</td>
					</tr>
				)
			})}
			</tbody>
		)
}


class MyTransactions_sOil extends Component {
	render() {
		return(
			<div className= "card bg-dark text-white">
				<div className= "card-header">
					My Transactions
				</div>
			<div className= "card-body">
				<Tabs defaultActiveKey= "trades" className= "bg-dark text-white">
					<Tab eventKey= "trades" title= "Trades" className= "bg-dark">
						<table className= "table table-dark table-sm small">
							<thead>
								<tr>
									<th>Time</th>
									<th>sOil</th>
									<th>sOil/ETH</th>
								</tr>
							</thead>
							{showMyFilledOrders(this.props)}
						</table>
					</Tab>
					<Tab eventKey="orders" title= "Orders">
						<table className= "table table-dark table-sm small">
							<thead> 
								<tr>
									<th>Time</th>
									<th>sOil</th>
									<th>sOil/ETH</th>
								</tr>
							</thead>
							{showMyOpenOrders(this.props)}
						</table>
					</Tab>
				</Tabs>
			</div>
		</div>

			)
	}

}

function mapStateToProps(state){ 
	// const myOpenOrdersLoaded = myOpenOrdersLoadedSelector(state)
	// const orderCancelling = orderCancellingSelector(state)

	return{
		myFilledOrders: myFilledOrdersSelector_sOil(state),
		showMyFilledOrders: myFilledOrdersLoadedSelector_sOil(state),
		myOpenOrders:  myOpenOrdersSelector_sOil(state), 
		showMyOpenOrders: myOpenOrdersLoadedSelector_sOil(state),
		exchange: exchangeSelector(state),
		account: accountSelector(state)
	}
}

export default connect(mapStateToProps)(MyTransactions_sOil);