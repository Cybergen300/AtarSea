import React, { Component} from 'react';
import './App.css';
import slide1 from './slide1.png'
import illustration2 from './slide2.png'
import illustration3 from './slide3.png'
import {NavLink} from 'react-router-dom'


function clickMe(){
  alert('You clicked me !');
}


function App() {
  return (
    <div className= "vertical-split">

        <div className="header">
              <h1>
                AtarSea Exchange
              </h1>
        </div> 

        <nav className="navbar ml-5">
          <a>Exchange</a>
          <a>Market Prices</a>
          <a>Account</a>
          <a>Support</a>
        </nav>  

        <div className = "slide1">
          <h1> Welcome to AtarSea  
               <br/>A new vision of trading
          </h1>
          <button onClick = {clickMe}> Get started ... </button>
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
          <div className= "illustration">
            <img src={illustration2} />
          </div>
        </div>
        <div className = "Group2But">
          <button> Get Free PDF </button>
          <button> Go to website </button>
        </div>
      </div>

      <div className = "slide3">
        <div className= "Box1_S3">
          <div className= "text_slide3">
            <h1> Got a question ...  </h1>
            <h2> Don't worry we're here to help you ! </h2> 
            <p> Go over the support section to find our FAQ or 
            contact us we'll be happy to help you </p>
            <button onClick = {clickMe}> Get Help </button>
          </div>
          <div className= "illustration3">
            <img src={illustration3} />
          </div>   
      </div>
    </div>
  </div>
  );
}

function mapStateToProps(state){
}

const Navigation = () => (
      <nav>
        <ul>
          <li><NavLink to='/'>Home</NavLink></li>
          <li><NavLink to='/about'>About</NavLink></li>
          <li><NavLink to='/contact'>Contact</NavLink></li>
        </ul>
      </nav>
    );

export default App;
