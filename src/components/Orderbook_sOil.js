import React, { Component } from  'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip} from 'react-bootstrap'
import { fillOrder_sOil} from '../store/interaction'
import Spinner from './Spinner'
import {
  orderBookSelector_sOil,
  orderBookLoadedSelector_sOil,
  exchangeSelector,
  accountSelector,
  orderFillingSelector_sOil
} from '../store/selectors'


const renderOrder = (order, props) => {
  const { dispatch, exchange, account } = props

  return(
    <OverlayTrigger
      key={order.id}
      placement='auto'
      overlay={
        <Tooltip id={order.id}>
          {`Click here to ${order.orderFillAction}`}
        </Tooltip>
      }
    >
      <tr
        key={order.id}
        className="order-book-order"
        onClick={(e) => fillOrder_sOil(dispatch, exchange, order, account)}
      >
        <td>{order.tokenAmount.toFixed(2)}</td>
        <td className={`text-${order.orderTypeClass}`}>{order.tokenPrice}</td>
        <td>{order.etherAmount.toFixed(2)}</td>
      </tr>
    </OverlayTrigger>
  )
}

const showOrderBook = (props) => {
  const { orderBook } = props

  return(
    <tbody>
      {orderBook.sellOrders.map((order) => renderOrder(order, props))}
      <tr>
        <th>sOil</th>
        <th>sOil/ETH</th>
        <th>ETH</th>
      </tr>
      {orderBook.buyOrders.map((order) => renderOrder(order, props))}
    </tbody>
  )
}

class OrderBook_sOil extends Component {
  render() {
    return (
      <div className="Exchange-Box3">
        <div className="card bg-dark text-white">
          <div className="card-header">
            Order Book
          </div>
          <div className="card-body order-book">
            <table className="table table-dark table-sm small">
              { this.props.showOrderBook ? showOrderBook(this.props) : <Spinner type='table' /> }
            </table>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const orderBookLoaded_sOil = orderBookLoadedSelector_sOil(state)
  const orderFilling_sOil = orderFillingSelector_sOil(state)

  return {
    orderBook: orderBookSelector_sOil(state),
    showOrderBook: orderBookLoadedSelector_sOil(state),
    exchange: exchangeSelector(state),
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(OrderBook_sOil);