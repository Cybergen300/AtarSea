// Contracts
const synthOil = artifacts.require("sOil")
const Exchange = artifacts.require("Exchange")

// Utils
const ETHER_ADDRESS = '0x0000000000000000000000000000000000000000' // Ether token deposit address
const ether = (n) => {
  return new web3.utils.BN(
    web3.utils.toWei(n.toString(), 'ether')
  )
}
const tokens = (n) => ether(n)

const wait = (seconds) => {
  const milliseconds = seconds * 1000
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

module.exports = async function(callback) {
  try {
    // Fetch accounts from wallet - these are unlocked
    const accounts = await web3.eth.getAccounts()

    // Fetch the deployed token
    const sOil = await synthOil.deployed()
    console.log('sOil fetched', sOil.address)

    // Fetch the deployed exchange
    const exchange = await Exchange.deployed()
    console.log('Exchange fetched', exchange.address)

    // Give tokens to account[1]
    const sender = accounts[0]
    const receiver = accounts[1]
    let amount = web3.utils.toWei('10000', 'ether') // 10,000 tokens

    await sOil.transfer(receiver, amount, { from: sender })
    console.log(`Transferred ${amount} sOil from ${sender} to ${receiver}`)

    // Set up exchange users
    const user1 = accounts[0]
    const user2 = accounts[1]

    // User 1 Deposits Ether
    amount = 0.001
    await exchange.depositEther({ from: user1, value: ether(amount) })
    console.log(`Deposited ${amount} Ether from ${user1}`)

    // User 2 Approves Tokens
    amount = 10000
    await sOil.approve(exchange.address, tokens(amount), { from: user2 })
    console.log(`Approved ${amount} sOil from ${user2}`)

    // User 2 Deposits Tokens
    await exchange.depositsETH(sOil.address, tokens(amount), { from: user2 })
    console.log(`Deposited ${amount} tokens from ${user2}`)

    /////////////////////////////////////////////////////////////
    // Seed a Cancelled Order
    //

    // User 1 makes order to get tokens

    /////////////////////////////////////////////////////////////
    // Seed Filled Orders
    //



    /////////////////////////////////////////////////////////////
    // Seed Open Orders
    //

    // User 1 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await exchange.makeOrder_sOil(sOil.address, tokens( 10 * i), ETHER_ADDRESS, ether(0.01), { from: user1 })
      console.log(`Made order from ${user1}`)
      // Wait 1 second
      await wait(1)
    }

    // User 2 makes 10 orders
    for (let i = 1; i <= 10; i++) {
      result = await exchange.makeOrder_sOil(ETHER_ADDRESS, ether(0.01), sOil.address, tokens( 10 * i), { from: user2 })
      console.log(`Made order from ${user2}`)
      // Wait 1 second
      await wait(1)
    }

  }
  catch(error) {
    console.log(error)
  }

  callback()
}
