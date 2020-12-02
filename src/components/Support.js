import React , {Component} from 'react'
import {NavLink, Switch, Route} from 'react-router-dom'
import './Support.css'
import illustration2 from './ask.jpg'
import illustration4 from './social_media.png'

class Support extends Component{
	render() {
		return(
			<div className = 'containerSupport'>
				<div className= 'Box1'>
					<div className= "text1">
						Searching for help ? 

						<p> Hoover to our get started PDF to get a full overview of the platform or read our FAQ.  
						</p>
						<div className = "Group1But">
			          		<button> Get Free PDF </button>
			          		<button> FAQ </button>
			        	</div>
		        	</div>

		        </div>

				<div className = "support2">
					<div className ='text2'>
						<h1> Want  to get in touch  ?  </h1>

						<p> You can contact the team at the following <br/> address : 
							christophe.richon.pro@gmail.com <br/></p>

						<p>	Or directly reach us on  twitter at @Cybergen3 <br/>
							we'll do our best to  respond  as quickly as possible  
						</p>
					</div>
		        	<div className= "illustration4">
	            		<img src={illustration4} />
	          		</div>

				</div>
			</div>
		)
	}
}

export default Support;