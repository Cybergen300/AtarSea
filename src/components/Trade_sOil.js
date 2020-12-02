import React , {Component} from 'react'
import {connect} from 'react-redux'
import {
  filledOrdersLoadedSelector_sOil,
  filledOrdersSelector_sOil
} from '../store/selectors'


const showFilledOrders = (filledOrders_sOil) => {
  return(
    <tbody>
      {filledOrders_sOil.map((order) => {
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

class Trades_sOil extends Component {
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
                    <th>sOil</th>
                    <th>sOil/ETH</th>
                  </tr>
                </thead>
                {showFilledOrders(this.props.filledOrders_sOil)}
              </table>
            </div>
          </div>
        </div>
      )
  }

}

function mapStateToProps(state) {
  return{
    filledOrdersLoaded_sOil: filledOrdersLoadedSelector_sOil(state),
    filledOrders_sOil: filledOrdersSelector_sOil(state),
  }
}

export default connect(mapStateToProps)(Trades_sOil)