const synthOil = artifacts.require('./sOil')

const EVM_REVERT = 'VM Exception while processing transaction: revert'

require('chai')
	.use(require('chai-as-promised'))
	.should()

const tokens = (n) => {
	return new web3.utils.BN(
		web3.utils.toWei(n.toString(), 'ether'))
}


contract ('sOil', ([deployer, receiver, exchange]) => {
	const name = 'synthetic Oil'
	const symbol = 'sOil'
	const decimals = '18'
	const totalSupply  = tokens(1000000).toString()
	let token

	beforeEach(async () => {
		sOil = await synthOil.new()
	})

	describe('deployment', () => {
		it('tracks the name', async() => {
			const result = await sOil.name()
			result.should.equal(name)
		})

		it('tracks the symbol', async() => {
			const result = await sOil.symbol()
			result.should.equal(symbol)
		})

		it('tracks the nb of decimals', async() => {
			const result = await sOil.decimals()
			result.toString().should.equal(decimals)
		})

		it('tracks the totalSupply', async() => {
			const result = await sOil.totalSupply()
			result.toString().should.equal(totalSupply)
		})

		it('assigns the total supply to the deployer', async() => {
			const result = await sOil.balanceOf(deployer)
			result.toString().should.equal(totalSupply)
		})
	})

	describe('sending tokens', () => {
		let result 
		let amount

		describe('success', async () => {
			beforeEach(async () => {
				amount = tokens(100)
				result = await sOil.transfer(receiver, amount, {from: deployer})
			})

			it('transfers token balances', async() =>  {
				let balanceOf
				balanceOf = await sOil.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(999900).toString())
				balanceOf = await sOil.balanceOf(receiver)
				balanceOf.toString().should.equal(amount.toString())
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

		describe('failure', async () => {
			it('rejects insufficient balances', async () => {
				let invalidAmount
				invalidAmount = tokens(100000000)
				await sOil.transfer(receiver, invalidAmount, {from: deployer}).should.be.rejectedWith(EVM_REVERT)

				//Attempt transfer tokens when you have none  
				invalidAmount = tokens(10) 
				await sOil.transfer(deployer,  invalidAmount, {from: receiver}).should.be.rejectedWith(EVM_REVERT)
			})
			it('rejects invalid recipients', async () => {
				await sOil.transfer(0x0, amount,  {from: deployer}).should.be.rejected
			})
		})
	})

	describe('approving tokens', () => {
		let result
		let amount 

		beforeEach(async ()=> {
			amount  = tokens(100)
			result = await sOil.approve(exchange, amount, {from:deployer})
		})

		describe('success', () => {
			it('allocate an allowance for delegated token spending on exchange', async () => {
				const allowance = await sOil.allowance(deployer, exchange)
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
				await sOil.approve(0x0,  amount,  {from:deployer}).should.be.rejected
			})
		})
	})

	describe('delegated token transfers', () => {
		let result 
		let amount 

		beforeEach(async () => {
			amount = tokens(100)
			await sOil.approve(exchange, amount, {from: deployer})
		})

		describe('success', async () => {
			beforeEach(async () => {
				result = await sOil.transferFrom(deployer,receiver, amount, {from: exchange})
			})

			it('transfer token balances', async () => {
				let balanceOf
				balanceOf = await sOil.balanceOf(deployer)
				balanceOf.toString().should.equal(tokens(999900).toString())
				balanceOf = await sOil.balanceOf(receiver)
				balanceOf.toString().should.equal(tokens(100).toString())
			})

			it('resets the allowance', async() => {
				const allowance = await sOil.allowance(deployer, exchange)
				allowance.toString().should.equal('0')
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

		describe('failure', async() => {
			it('rejects insufficient amounts', async () => {
				const invalidAmount = tokens(100000000)
				await sOil.transferFrom(deployer, receiver, invalidAmount, {from: exchange}).should.be.rejectedWith(EVM_REVERT)
			})

			it('rejects invalid recipients', async () => {
				await sOil.transferFrom(deployer, 0x0, amount, {from: exchange}).should.be.rejected
			})
		})
	})

})








































