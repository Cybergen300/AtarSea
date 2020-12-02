import React , {Component} from 'react'
import {connect} from 'react-redux'
import {
  filledOrdersLoadedSelector_USD,
  filledOrdersSelector_USD
} from '../store/selectors'


const showFilledOrders = (filledOrders_USD) => {
  return(
    <tbody>
      {filledOrders_USD.map((order) => {
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

class Trades_USD extends Component {
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
                    <th>sUSD</th>
                    <th>sUSD/ETH</th>
                  </tr>
                </thead>
                {showFilledOrders(this.props.filledOrders_USD)}
              </table>
            </div>
          </div>
        </div>
      )
  }

}

function mapStateToProps(state) {
  return{
    filledOrdersLoaded_USD: filledOrdersLoadedSelector_USD(state),
    filledOrders_USD: filledOrdersSelector_USD(state),
  }
}

export default connect(mapStateToProps)(Trades_USD)