import React, { Component } from 'react'
import {NavLink,  Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux'


class Header extends Component{
	render() {
		return(
			<div className="header">
            	<h1>
            		<NavLink to= '/'>
                		AtarSea Exchange
              		</NavLink>
              	</h1>
        	</div>
		)
	}
}

function mapStateToProps(state){
	return{

	}
}

export default connect(mapStateToProps) (Header);