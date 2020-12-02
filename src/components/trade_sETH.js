import React, {Component} from 'react'
import  {connect} from 'react-redux'
import {
	filledOrdersLoadedSelector_sETH,
	filledOrdersSelector_sETH
} from '../store/selectors'

const showFilledOrders = (filledOrders_sETH) => {
  return(
    <tbody>
      {filledOrders_sETH.map((order) => {
        return  (
          <tr className= {`order-${order.id}`} key = {order.id}> 
            <td className = "text-muted" > {order.formattedTimestamp}</td>
            <td>{order.tokenAmount}</td>
            <td className= {`text-${order.tokenPriceClass}`}>{order.tokenPrice}</td>
          </tr>
         )
      })}
    </tbody>
  )
}

class Trades_sETH extends Component {
  render(){
    return(
        <div className="Exchange-Box1-2">
          <div className="card bg-dark text-white">
            <div className="card-header">
              Trades
            </div>
            <div className="card-body">
              <table className= 'table table-dark table-sm small'>
                <thead> 
                  <tr>
                    <th>Time</th>
                    <th>sETH</th>
                    <th>sETH/ETH</th>
                  </tr>
                </thead>
                {showFilledOrders(this.props.filledOrders_sETH)}
              </table>
            </div>
          </div>
        </div>
      )
  }

}

function mapStateToProps(state) {
  return{
    filledOrdersLoaded_sETH: filledOrdersLoadedSelector_sETH(state),
    filledOrders_sETH: filledOrdersSelector_sETH(state),
  }
}

export default connect(mapStateToProps)(Trades_sETH)






















