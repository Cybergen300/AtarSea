import React, { Component } from  'react'
import { connect } from 'react-redux'
import { OverlayTrigger, Tooltip} from 'react-bootstrap'
import { fillOrder_USD} from '../store/interaction'
import Spinner from './Spinner'
import {
  orderBookSelector_USD,
  orderBookLoadedSelector_USD,
  exchangeSelector,
  accountSelector,
  orderFillingSelector_USD
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
        onClick={(e) => fillOrder_USD(dispatch, exchange, order, account)}
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
        <th>sUSD</th>
        <th>sUSD/ETH</th>
        <th>ETH</th>
      </tr>
      {orderBook.buyOrders.map((order) => renderOrder(order, props))}
    </tbody>
  )
}

class OrderBook_USD extends Component {
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
  const orderBookLoaded_USD = orderBookLoadedSelector_USD(state)
  const orderFilling_USD = orderFillingSelector_USD(state)

  return {
    orderBook: orderBookSelector_USD(state),
    showOrderBook: orderBookLoadedSelector_USD(state),
    exchange: exchangeSelector(state),
    account: accountSelector(state)
  }
}

export default connect(mapStateToProps)(OrderBook_USD);