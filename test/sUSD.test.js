const synthUSD = artifacts.require('./sUSD')
const EVM_REVERT = 'VM Exception while processing transaction: revert'

require('chai')
	.use(require('chai-as-promised'))
	.should()

const tokens = (n) => {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether'))
}

contract('sUSD', ([deployer, receiver, exchange]) => {
	const name = "synthetic USD"
	const symbol = "sUSD"
	const decimals = '18'
	const totalSupply = tokens(1000000000).toString()
	let sUSD

	beforeEach(async () =>  {
		sUSD = await synthUSD.new()
	})

	describe('deployment', () => {
		it('tracks the name', async() => {
			const result = await sUSD.name()
			result.should.equal(name)
		})

		it('tracks  the symbol', async () => {
			const result = await sUSD.symbol()
			result.should.equal(symbol)
		})

		it('tracks the nb of decimals', async () => {
			const result = await sUSD.decimals()
			result.toString().should.equal(decimals)
		})

		it('tracks the total supply',  async () =>  {
			const result = await sUSD.totalSupply()
			result.toString().should.equal(totalSupply)
		})

		it('assigns the total supply to the deployer', async () => {
			const result = await sUSD.balanceOf(deployer)
			result.toString().should.equal(totalSupply)
		})
	})

	describe('sending tokens', () => {
		let result 
		let amount 

		describe('success', async () => {
			beforeEach(async () => {
				amount  = tokens(100)
				result = await sUSD.transfer(receiver, amount, {from:  deployer})
			})

			it('transfers sUSD balances', async () => {
				let balanceOf
				balanceOf = await sUSD.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(999999900).toString())
				balanceOf = await sUSD.balanceOf(receiver)
				balanceOf.toString().should.equal(tokens(100).toString())
			})

			it('emits a Transfer event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Transfer')
				const event = log.args
				event.from.toString().should.equal(deployer, 'from is correct')
				event.to.should.equal(receiver, 'to is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', () => {
			it('rejects insufficient balances', async () => {
				let invalidAmount 
				invalidAmount  = tokens(10000000000)
				await sUSD.transfer(receiver, invalidAmount, {from : deployer}).should.be.rejectedWith(EVM_REVERT)
			
				//ATtempt transfer sUSD when  you have none 
				invalidAmount = tokens(10) //receiver has no sUSD
				await sUSD.transfer(deployer, invalidAmount, {from: receiver}).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipient', async () => {
				await sUSD.transfer(0x0, amount, {from: deployer}).should.be.rejected
			})
		})
	})

	describe ('approving tokens', () => {
		let result 
		let amount 

		beforeEach(async () => {
			amount = tokens(100)
			result = await sUSD.approve(exchange, amount, {from : deployer})
		})

		describe('success', () => {
			it('allocates an allowance for delegated token spending on exchange', async  () => {
				const allowance = await sUSD.allowance(deployer, exchange)
				allowance.toString().should.equal(amount.toString())
			})

			it('emits an Approval event', async () => {
				const log = result.logs[0]
				log.event.should.eq('Approval')
				const event = log.args
				event.owner.should.equal(deployer, 'owner is correct')
				event.spender.should.equal(exchange, 'exchange is correct')
				event.value.toString().should.equal(amount.toString(), 'value is correct')
			})
		})

		describe('failure', () => {
			it('rejects invalid spender', async () => {
				await sUSD.approve(0x0, amount, {from: deployer}).should.be.rejected
			})
		})
	})

	describe('delegated sUSD transfers' , () => {
		let result 
		let amount 

		beforeEach(async () => {
			amount = tokens(100)
			await sUSD.approve(exchange, amount, {from: deployer})
		})

		describe('success', async () => {
			beforeEach(async () => {
				result = await sUSD.transferFrom(deployer, receiver, amount, {from: exchange})
			})

			it('transfer token balances', async () => {
				let balanceOf
				balanceOf = await sUSD.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(999999900).toString())
			})

			it('resets the allowance', async () => {
				const allowance = await sUSD.allowance(deployer, exchange)
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
				const invalidAmount = tokens(100000000000)
				await sUSD.transferFrom(deployer, receiver, invalidAmount, {from: exchange}).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipients', async () => {
				await sUSD.transferFrom(deployer, 0x0, amount, {from: exchange}).should.be.rejected
			})
		})
	})
})








































