const  synthETH  = artifacts.require('./sETH')

const  EVM_REVERT = 'VM Exception while processing transaction: revert'

require('chai')
	.use(require('chai-as-promised'))
	.should()

const tokens = (n) => {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether'))
}

contract('sETH', ([deployer, receiver, exchange]) => {
	const name = 'synthetic ETH'
	const symbol = 'sETH'
	const decimals = '18'
	const totalSupply = tokens(113000000).toString()
	let sETH

	beforeEach(async  () => {
		sETH = await synthETH.new()
	})

	describe('deployment', () => {
		it('tracks the name', async() => {
			const result = await sETH.name()
			result.should.equal(name)
		})

		it('tracks the symbol', async() => {
			const result = await sETH.symbol()
			result.should.equal(symbol)
		})

		it('tracks the number of decimals', async() => { 
			const result = await sETH.decimals()
			result.toString().should.equal(decimals)
		})

		it('tracks the total supply', async() => {
			const result = await sETH.totalSupply()
			result.toString().should.equal(totalSupply)
		})

		it('assigns the total supply to the deployer', async () => {
			const result = await sETH.balanceOf(deployer)
			result.toString().should.equal(totalSupply)
		})
	})

	describe('sending tokens', () => {
		let result 
		let amount 

		describe('success', async () => {
			beforeEach(async () => {
				amount = tokens(100)
				result = await sETH.transfer(receiver, amount, {from: deployer})
			})

			it('transfers sETH balances', async () => {
				let balanceOf
				balanceOf = await sETH.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(112999900).toString())
				balanceOf = await sETH.balanceOf(receiver)
				balanceOf.toString().should.equal(tokens(100).toString())
			})

			it('emits a Transfer event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Transfer')
				const event  = log.args
				event.from.toString().should.equal(deployer, 'from is correct')
				event.to.should.equal(receiver, 'to is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', async () => {
			it('rejects insufficient balances', async () => {
				let invalidAmount
				invalidAmount = tokens(1130000000)
				await sETH.transfer(receiver, invalidAmount, {from: deployer}).should.be.rejectedWith(EVM_REVERT)
				
				//Attempt transfer sETH when you have none
				invalidAmount = tokens(10) //Receeiver has no sETh 
				await sETH.transfer(deployer, invalidAmount, {from: receiver}).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipients', async () => {
				await sETH.transfer(0x0, amount, {from: deployer}).should.be.rejected
			})
		})
	})

	describe(' approving tokens', () => {
		let result
		let amount 

		beforeEach(async () => {
			amount = tokens(100)
			result = await sETH.approve(exchange, amount, {from : deployer})
		})

		describe('success', () => {
			it('allocates an allowance for delegated token spending on exchange', async () => {
				const allowance = await sETH.allowance(deployer, exchange)
				allowance.toString().should.equal(amount.toString())
			})

			it('emits an Approval event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Approval')
				const event = log.args
				event.owner.toString().should.equal(deployer, 'owner is correct')
				event.spender.should.equal(exchange, 'exchange is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', () => {
			it('rejects invalid spender', async () => {
				await sETH.approve(0x0, amount, {from: deployer}).should.be.rejected
			})
		})
	})

	describe('delegated token transfers', () => {
		let result 
		let amount 

		beforeEach(async () => {
			amount  = tokens(100)
			await sETH.approve(exchange, amount, {from: deployer})
		})

		describe('success', async () => {
			beforeEach(async () => {
				result = await sETH.transferFrom(deployer, receiver, amount, {from: exchange})
			})

			it('transfer token balances', async () => {
				let balanceOf
				balanceOf = await sETH.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(112999900).toString())
				balanceOf = await sETH.balanceOf(receiver)
				balanceOf.toString().should.equal(tokens(100).toString())
			})

			it('resets the allowance', async () => {
				const allowance = await sETH.allowance(deployer, exchange)
				allowance.toString().should.equal('0')
			})

			it('emits a Transfer event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Transfer')
				const event = log.args
				event.from.toString().should.equal(deployer, 'from is correct')
				event.to.toString().should.equal(receiver, 'to is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', async () => {
			it('rejects insufficient amounts', async () => {
				const invalidAmount= tokens(130000000)
				await sETH.transferFrom(deployer, receiver, invalidAmount, {from: exchange}).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipients', async  () => {
				await sETH.transferFrom(deployer, 0x0, amount, {from: exchange}).should.be.rejected
			})
		})

	})

})



















































