import React, {Component} from 'react';
import {NavLink,  Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux'
import './App.css'; 
import Navbar from './Navbar.js'
import Home from './Home.js'
import Main from  './Main.js'
import Header from './Header.js'
import {loadWeb3, 
        loadAccount, 
        loadToken, 
        loadExchange, 
        loadsUSD,
        loadsETH, 
        loadsOil
      }
         from '../store/interaction'
import {accountSelector} from '../store/selectors'
import {contractsLoadedSelector} from '../store/selectors'


class App extends Component {

  async componentWillMount() {
    await this.loadBlockchainData(this.props.dispatch)

  }

  async  loadBlockchainData(dispatch){
    const web3 = loadWeb3(dispatch)
    const network = await web3.eth.net.getNetworkType()
    const networkId = await web3.eth.net.getId()
    const accounts = await loadAccount(web3,  dispatch)
    const token = await loadToken(web3, networkId, dispatch)
    if(!token) { 
      window.alert('Token contract not deployed to the current network. Please select another network with Metamask')
      return
    }
    const sUSD = await loadsUSD(web3, networkId, dispatch)
    if(!sUSD) { 
      window.alert('sUSD contract not deployed to the current network. Please select another network with Metamask')
      return
    }

    const sETH = await loadsETH(web3, networkId, dispatch)
    if(!sETH) { 
      window.alert('sUSD contract not deployed to the current network. Please select another network with Metamask')
      return
    }

    const sOil = await loadsOil(web3, networkId, dispatch)
    if(!sOil) { 
      window.alert('sUSD contract not deployed to the current network. Please select another network with Metamask')
      return
    }

    const exchange = await loadExchange(web3, networkId, dispatch)
    if(!exchange) { 
      window.alert('Token contract not deployed to the current network. Please select another network with Metamask')
      return
    }
  }
	render() {
  console.log(this.props.account)
	return(
		<div className = "vertical-split"> 
			<Header/>
        	<Navbar/> 
          {this.props.contractsLoaded ?  <Main /> : <div className="content"></div> }
        </div>
		)
	}
}

function mapStateToProps(state){
  return{
    contractsLoaded: contractsLoadedSelector(state),
  }
}
export default connect(mapStateToProps)(App);
