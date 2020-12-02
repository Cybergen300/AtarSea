import React,  {Component} from 'react';
import {NavLink,  Switch, Route} from 'react-router-dom';
import illustration2 from './slide2.png'
import illustration3 from './help.jpg'

function clickMe(){
  alert('You clicked me !');
}

class Home extends Component { 
	render() {

		return (
		<div className= 'HomeContainer'>
	        <div className = "slide1">
	          <h1> Welcome to AtarSea  
	               <br/>A new vision of trading
	          </h1>
	          <button><NavLink to = 'Exchange'> Get started ... </NavLink></button>
	        </div>

	        <div className = "slide2">
	        	<div className= "Box1_S2">
	            	<div className= "text_slide2">
		             	<h1> Willing to learn more about <br/> crypto currency ... </h1>
		              	<h2>We got you covered ! </h2> 

	              		<p>Go check out our free crypto guide or head on to our partner website 
	              		to get additional ressources
	              		</p>
	            	</div>

	        	</div>
	        	<div className = "Group2But">
	          		<button> Get Free PDF </button>
	          		<button onClick={ () => window.open("https://cybergen.jimdofree.com/", '_blank')}> Go to website </button>
	        	</div> 
	      	</div>


	      	<div className = "slide3">
	        	<div className= "Box1_S3">
	          		<div className= "text_slide3">
	            		<h1> Got a question ...  </h1>
	            		<h2> Don't worry we're here to help you ! </h2> 
	            		<p> Go over the support section to find our FAQ or 
	            		contact us we'll be happy to help you </p>
	            		
	            		<button><NavLink to= '/Support'> Get Help </NavLink></button>
	          		</div>
 	          		<div className= "illustration3">
	            		<img src={illustration3} />
	          		</div> 
	      		</div>
	    	</div>
	    </div>
    	);
	}


}

export default  Home; 