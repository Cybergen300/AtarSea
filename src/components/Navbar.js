import React, { Component } from 'react'
import {NavLink,  Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux'


class Navbar extends Component{
	render() {
		return (
	        <nav className="navbar">
	        	<ul>
		        	<li><NavLink to ='/'>Home</NavLink></li>
		        	<li><NavLink to = '/Exchange'>Exchange</NavLink></li>
		          	<li><NavLink to= '/Account'>Account</NavLink></li>
		         	<li><NavLink to= '/Support'>Support</NavLink></li>
		        </ul> 
	        </nav>                  
		)
	}
}

function mapStateToProps(state){
	return{

	}
}

export default connect(mapStateToProps) (Navbar);