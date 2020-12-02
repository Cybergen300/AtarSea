const Token = artifacts.require("Token")
const synthETH = artifacts.require("sETH")
const synthUSD = artifacts.require("sUSD")
const synthOil = artifacts.require("sOil")
const Exchange = artifacts.require("Exchange")
const { LinkToken } = require('@chainlink/contracts/truffle/v0.4/LinkToken')
const { Oracle } = require('@chainlink/contracts/truffle/v0.6/Oracle')


module.exports = async function(deployer, network , [defaultAccount]) {

  // Local (development) networks need their own deployment of the LINK
  if (!network.startsWith('live')) {
    LinkToken.setProvider(deployer.provider)
    Oracle.setProvider(deployer.provider)
    try {
    //Deploy tokens contracts
    const accounts = await web3.eth.getAccounts()
    await deployer.deploy(Token)
    await deployer.deploy(synthUSD)
    await deployer.deploy(synthETH)
    await deployer.deploy(synthOil)
    
    //Deploy Exchange contract
    const feeAccount = accounts[0]
    const feePercent = 10
    await  deployer.deploy(Exchange, feeAccount, feePercent)

    } catch (err) {
      console.log(err)
    }
    } else{
    // For live networks, use the 0 address to allow the ChainlinkRegistry
    //contract  automatically  retrieve the correct address for us 
    
  //Deploy tokens contracts
  const accounts = await web3.eth.getAccounts()
  await deployer.deploy(Token)
  await deployer.deploy(synthUSD)
  await deployer.deploy(synthETH)
  await deployer.deploy(synthOil)
    
  //Deploy Exchange contract
  const feeAccount = accounts[0]
  const feePercent = 10

  await  deployer.deploy(Exchange, feeAccount, feePercent)

  }
};
