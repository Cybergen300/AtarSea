import React  , {Component} from 'react'
import { connect } from 'react-redux'
import {
	loadBalances,
	depositEther, 
	withdrawEther, 
	depositToken, 
	withdrawToken,
	depositsUSD, 
	withdrawsUSD
} from '../store/interaction'
import {  Tabs, Tab } from 'react-bootstrap'
import Spinner from './Spinner'
import{ 
  exchangeSelector,
  tokenSelector,
  sUSDSelector,
  accountSelector,
  web3Selector,
  etherBalanceSelector,
  tokenBalanceSelector,
  sUSDBalanceSelector,
  exchangeEtherBalanceSelector,
  exchangeTokenBalanceSelector,
  exchangesUSDBalanceSelector,
  balancesLoadingSelector,
  etherDepositAmountSelector,
  etherWithdrawAmountSelector,
  tokenDepositAmountSelector,
  tokenWithdrawAmountSelector,
  sUSDDepositAmountSelector,
  sUSDWithdrawAmountSelector,
	} from'../store/selectors'
import {
	etherDepositAmountChanged, 
	etherWithdrawAmountChanged,
	tokenDepositAmountChanged,
	tokenWithdrawAmountChanged,
	sUSDDepositAmountChanged,
	sUSDWithdrawAmountChanged,
} from '../store/actions'


 const showForm = (props) => {

 	const {
    dispatch,
    exchange,
    web3,
    account,
    etherBalance,
    tokenBalance,
    sUSDBalance,
    exchangeEtherBalance,
    exchangeTokenBalance,
    exchangesUSDBalance,
    etherDepositAmount,
    token,
    sUSD, 
    tokenDepositAmount,
    sUSDDepositAmount,
    etherWithdrawAmount,
    tokenWithdrawAmount,
    sUSDWithdrawAmount
 	} = props 

function refreshPage() {
	window.location.reload(false);
 }

 	return(
 		<Tabs defaultActiveKey= "deposit" className= "bg-dark text-white">
 			<Tab  eventKey= "deposit" title="Deposit" className="bg-dark">
 				<table className= "table table-dark table-sm small">
	 				<thead>
	 					<tr>
	 						<th>Token</th>
	 						<th>Wallet</th>
	 						<th>Exchange</th>
	 					</tr>
	 				</thead>
	 				<tbody>
	 					<tr>
	 						<td>ETH</td>
	 						<td>{etherBalance}</td>
	 						<td>{exchangeEtherBalance}</td>
	 					</tr>
	 					<tr>
	 						<td>DAPP</td>
	 						<td>{tokenBalance}</td>
	 						<td> {exchangeTokenBalance}</td>
	 					</tr>
	 					<tr>
	 						<td>sUSD</td>
	 						<td>{sUSDBalance}</td>
	 						<td> {exchangesUSDBalance}</td>
	 					</tr>
	 				</tbody>
	 			</table>

	 			<form className= "row" onSubmit={(event) => {
	 				event.preventDefault()
	 				depositEther(dispatch, exchange, web3, etherDepositAmount, account)
	 				}}>
	 				<div className= "col-12 col-sm pr-sm-2">
	 					<input
	 						type= "text"
	 						placeholder= "ETH Amount"
	 						onChange= {(e) => dispatch( etherDepositAmountChanged(e.target.value))}
	 						className= "form-control form-control-sm bg-dark text-white"
	 						required />
	 				</div>
	 				<div className="col-12 col-sm-auto pl-sm-0">
	 					<button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
	 				</div>
	 			</form>
	 			<br/>
				<form className="row" onSubmit={(event) => {
				          event.preventDefault()
				          depositToken(dispatch, exchange, web3, token, tokenDepositAmount, account)
				        }}>
				          <div className="col-12 col-sm pr-sm-2">
				            <input
				            type="text"
				            placeholder="DAPP Amount"
				            onChange={(e) => dispatch( tokenDepositAmountChanged(e.target.value) )}
				            className="form-control form-control-sm bg-dark text-white"
				            required />
				          </div>
				          <div className="col-12 col-sm-auto pl-sm-0">
				            <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
				          </div>
				</form>
				<br/>
				<form className="row" onSubmit={(event) => {
				          event.preventDefault()
				          depositsUSD(dispatch, exchange, web3, sUSD, sUSDDepositAmount, account)
				        }}>
				          <div className="col-12 col-sm pr-sm-2">
				            <input
				            type="text"
				            placeholder="sUSD Amount"
				            onChange={(e) => dispatch( sUSDDepositAmountChanged(e.target.value) )}
				            className="form-control form-control-sm bg-dark text-white"
				            required />
				          </div>
				          <div className="col-12 col-sm-auto pl-sm-0">
				            <button type="submit" className="btn btn-primary btn-block btn-sm">Deposit</button>
				          </div>
				</form>

 			</Tab>

 			<Tab eventKey= "withdraw" title= "Withdraw" className= "bg-dark">
 				<table className= "table table-dark table-sm small">
	 				<thead>
	 					<tr>
	 						<th>Token</th>
	 						<th>Wallet</th>
	 						<th>Exchange</th>
	 					</tr>
	 				</thead>
	 				<tbody>
	 					<tr>
	 						<td>ETH</td>
	 						<td>{etherBalance}</td>
	 						<td>{exchangeEtherBalance}</td>
	 					</tr>
	 					<tr>
	 						<td>DAPP</td>
	 						<td>{tokenBalance}</td>
	 						<td>{exchangeTokenBalance}</td>
	 					</tr>

	 					<tr>
	 						<td>sUSD</td>
	 						<td>{sUSDBalance}</td>
	 						<td>{exchangesUSDBalance}</td>
	 					</tr>
	 				</tbody>
	 			</table>

	 			<form className="row" onSubmit={(event) => {
	 				event.preventDefault()
	 				withdrawEther(dispatch, exchange, web3, etherWithdrawAmount, account)

	 			    }}>
	 				<div className= "col-12 col-sm pr-sm-2">
	 					<input
	 						type= "text"
	 						placeholder= "ETH Amount"
	 						onChange= {(e) => dispatch( etherWithdrawAmountChanged(e.target.value) )}
	 						className = "form-control form-control-sm bg-dark text-white"
	 						required 
	 					/>
	 				</div>
	 				 <div className="col-12 col-sm-auto pl-sm-0">
            			<button type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
          			</div>
	 			</form>
	 			<br/>

		        <form className="row" onSubmit={(event) => {
		          event.preventDefault()
		          withdrawToken(dispatch, exchange, web3, token, tokenWithdrawAmount, account)
		        }}>
		          <div className="col-12 col-sm pr-sm-2">
		            <input
		            type="text"
		            placeholder="DAPP Amount"
		            onChange={(e) => dispatch( tokenWithdrawAmountChanged(e.target.value) )}
		            className="form-control form-control-sm bg-dark text-white"
		            required />
		          </div>
		          <div className="col-12 col-sm-auto pl-sm-0">
		            <button  type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
		          </div>
		        </form>
		        <br/>
		        <form className="row" onSubmit={(event) => {
		          event.preventDefault()
		          withdrawsUSD(dispatch, exchange, web3, sUSD, sUSDWithdrawAmount, account)
		        }}>
		          <div className="col-12 col-sm pr-sm-2">
		            <input
		            type="text"
		            placeholder="sUSD Amount"
		            onChange={(e) => dispatch( sUSDWithdrawAmountChanged(e.target.value) )}
		            className="form-control form-control-sm bg-dark text-white"
		            required />
		          </div>
		          <div className="col-12 col-sm-auto pl-sm-0">
		            <button  type="submit" className="btn btn-primary btn-block btn-sm">Withdraw</button>
		          </div>
		        </form>

 			</Tab>
 		</Tabs>
 	)
}


class Account extends Component {
	componentWillMount() {
		this.loadBlockchainData()
	}

	async loadBlockchainData(){
		const {dispatch, web3, exchange, token, sUSD,  account } = this.props
		await loadBalances(dispatch, web3, exchange, token, sUSD, account)
	}

	render() {
		return(
			<div className= "card bg-dark text-white">
				<div className= "card-header">
					account address : {this.props.account}
				</div>
				<div className= "card-body">
					{this.props.showForm ? showForm(this.props) : <Spinner />}
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	const balancesLoading = balancesLoadingSelector(state)


	return{
		account: accountSelector(state),
		exchange: exchangeSelector(state),
		token: tokenSelector(state),
		sUSD: sUSDSelector(state),
		web3: web3Selector(state),
		etherBalance: etherBalanceSelector(state),
		tokenBalance: tokenBalanceSelector(state),
		sUSDBalance: sUSDBalanceSelector(state),
		exchangeEtherBalance: exchangeEtherBalanceSelector(state), 
		exchangeTokenBalance: exchangeTokenBalanceSelector(state),
		exchangesUSDBalance: exchangesUSDBalanceSelector(state),
		balancesLoading,
		showForm: !balancesLoading,
		etherDepositAmount:   etherDepositAmountSelector(state),
		etherWithdrawAmount: etherWithdrawAmountSelector(state),
		tokenDepositAmount: tokenDepositAmountSelector(state),
		tokenWithdrawAmount: tokenWithdrawAmountSelector(state),
		sUSDDepositAmount: sUSDDepositAmountSelector(state),
		sUSDWithdrawAmount: sUSDWithdrawAmountSelector(state)


	}
}

export default connect(mapStateToProps)(Account)
