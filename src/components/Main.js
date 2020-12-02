import React , {Component} from 'react'
import {NavLink, Switch, Route} from 'react-router-dom'
import Home from './Home.js'
import Exchange from './Exchange.js'
import  MarketPrice from './MarketPrice'
import Account from './Account'
import Account_sOil from './Account_sOil'
import Support from './Support'

class Main extends Component{
	render() {
		return(
			<Switch>
				<Route exact path= '/' component = {Home}></Route>
				<Route exact path = '/Exchange' component= {Exchange}></Route>
				<Route exact path = '/Account' component= {Account_sOil}></Route>
				<Route exact path = '/Support' component= {Support}></Route>
			</Switch>
		)
	}
}

export default Main;