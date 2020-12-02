pragma solidity ^0.6.6; 
import "./Token.sol";
import "./sUSD.sol";
import "./sETH.sol";
import "./sOil.sol";
//import "@chainlink/contracts/src/v0.6/ChainlinkClient.sol";
//import "@openzeppelin/contracts/access/Ownable.sol";
//import "@chainlink/evm-contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";
import "@chainlink/contracts/src/v0.6/interfaces/AggregatorV3Interface.sol";

contract Exchange {

	//variables
	address public feeAccount; //the account for the exchange fees
	uint256 public feePercent; //the fee percentage 
	address constant ETHER = address(0); //allow us to store Ether in token mapping with blank address
	uint256 public orderCount;
	uint256 public priceETH;
	AggregatorV3Interface internal priceFeed;
	AggregatorV3Interface internal pricesOil;
	mapping(address => mapping(address => uint256)) public tokens;
	mapping(uint256 => _Order) public orders;
	mapping(uint256 => bool) public orderCancelled;
	mapping(uint256 => bool) public orderFilled;


	//Events
	event Deposit(address token, address user, uint256 amount, uint256 balance);
	event Deposit_USD(address token, address user, uint256 amount, uint256 balance);
	event Deposit_sETH(address token, address user, uint256 amount, uint256 balance);
	event Deposit_sOil(address token, address user, uint256 amount, uint256 balance);		
	event Withdraw(address token, address user, uint256 amount, uint256 balance);
	event Withdraw_USD(address token, address user, uint256 amount, uint256 balance);
	event Withdraw_sETH(address token, address user, uint256 amount, uint256 balance);
	event Withdraw_sOil(address token, address user, uint256 amount, uint256 balance);
	event Order(
		uint256 id, 
		address  user, 
		address tokenGet,  
		uint256 amountGet, 
		address tokenGive,  
		uint256 amountGive,
		uint256 timestamp
		);

	event Order_USD(
		uint256 id, 
		address  user, 
		address tokenGet,  
		uint256 amountGet, 
		address tokenGive,  
		uint256 amountGive,
		uint256 timestamp
		);

	event Order_sETH(
		uint256 id, 
		address  user, 
		address tokenGet,  
		uint256 amountGet, 
		address tokenGive,  
		uint256 amountGive,
		uint256 timestamp
		);

	event Order_sOil(
		uint256 id, 
		address  user, 
		address tokenGet,  
		uint256 amountGet, 
		address tokenGive,  
		uint256 amountGive,
		uint256 timestamp
		);

	event Cancel(
		uint256 id, 
		address user, 
		address tokenGet, 
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		uint256 timestamp
		);

	event Cancel_USD(
		uint256 id, 
		address user, 
		address tokenGet, 
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		uint256 timestamp
		);

	event Cancel_sETH(
		uint256 id, 
		address user, 
		address tokenGet, 
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		uint256 timestamp
		);

	event Cancel_sOil(
		uint256 id, 
		address user, 
		address tokenGet, 
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		uint256 timestamp
		);

	event Trade(
		uint256 id, 
		address user, 
		address tokenGet,
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		address userFill,
		uint256 timestamp  
		);

	event Trade_USD(
		uint256 id, 
		address user, 
		address tokenGet,
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		address userFill,
		uint256 timestamp  
		);

	event Trade_sETH(
		uint256 id, 
		address user, 
		address tokenGet,
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		address userFill,
		uint256 timestamp  
		);

	event Trade_sOil(
		uint256 id, 
		address user, 
		address tokenGet,
		uint256 amountGet, 
		address tokenGive,
		uint256 amountGive,
		address userFill,
		uint256 timestamp  
		);


	struct _Order{
		uint256 id; 
		address user;
		address tokenGet; 
		uint256 amountGet;
		address tokenGive;
		uint256 amountGive;
		uint256 timestamp;
	}

    /**
     * Network: Kovan
     * Aggregator: ETH/USD
     * Address: 0x9326BFA02ADD2366b30bacB125260Af641031331
     */
	constructor(address _feeAccount, uint256 _feePercent) public {
		feeAccount = _feeAccount;
		feePercent = _feePercent;
		priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
		pricesOil = AggregatorV3Interface(0x48c9FF5bFD7D12e3C511022A6E54fB1c5b8DC3Ea);
	} 


	//Exchange functions

	receive() external payable {
		revert();
	}

	function depositEther() payable public {
		tokens[ETHER][msg.sender] += msg.value; 
		emit Deposit(ETHER, msg.sender, msg.value, tokens[ETHER][msg.sender]);
	}

	function withdrawEther(uint _amount) public {
		require (tokens[ETHER][msg.sender] >= _amount); 
		tokens[ETHER][msg.sender] -= _amount;
		msg.sender.transfer(_amount); 
		emit Withdraw(ETHER, msg.sender, _amount, tokens[ETHER][msg.sender]);
	}

	function depositToken(address _token, uint _amount) public {
		//Don't allow Ether deposits
		require(_token != ETHER); 
		require(Token(_token).transferFrom(msg.sender, address(this), _amount));
		tokens[_token][msg.sender] += _amount;
		emit Deposit(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function depositsUSD(address _token, uint _amount) public {
		//Don't allow Ether deposits
		require(_token != ETHER); 
		require(sUSD(_token).transferFrom(msg.sender, address(this), _amount));
		tokens[_token][msg.sender] += _amount;
		emit Deposit_USD(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function depositsETH(address _token, uint _amount) public {
		//Don't allow Ether deposits
		require(_token != ETHER); 
		require(sETH(_token).transferFrom(msg.sender, address(this), _amount));
		tokens[_token][msg.sender] += _amount;
		emit Deposit_sETH(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function depositsOil(address _token, uint _amount) public {
		//Don't allow Ether deposits
		require(_token != ETHER); 
		require(sOil(_token).transferFrom(msg.sender, address(this), _amount));
		tokens[_token][msg.sender] += _amount;
		emit Deposit_sOil(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function withdrawToken(address _token, uint _amount) public {
		require(_token != ETHER); 
		require(tokens[_token][msg.sender] >= _amount); 
		tokens[_token][msg.sender] -= _amount;
		require(Token(_token).transfer(msg.sender, _amount));
		emit Withdraw(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function withdrawsUSD(address _token, uint _amount) public {
		require(_token != ETHER); 
		require(tokens[_token][msg.sender] >= _amount); 
		tokens[_token][msg.sender] -= _amount;
		require(sUSD(_token).transfer(msg.sender, _amount));
		emit Withdraw_USD(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}	

	function withdrawssETH(address _token, uint _amount) public {
		require(_token != ETHER); 
		require(tokens[_token][msg.sender] >= _amount); 
		tokens[_token][msg.sender] -= _amount;
		require(sETH(_token).transfer(msg.sender, _amount));
		emit Withdraw_sETH(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function withdrawsOil(address _token, uint _amount) public {
		require(_token != ETHER); 
		require(tokens[_token][msg.sender] >= _amount); 
		tokens[_token][msg.sender] -= _amount;
		require(sOil(_token).transfer(msg.sender, _amount));
		emit Withdraw_sOil(_token, msg.sender, _amount, tokens[_token][msg.sender]);
	}

	function balanceOf(address _token, address _user) public view returns (uint256) {
		return tokens[_token][_user];
	}

	function  makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive,  uint256 _amountGive) public {
		orderCount += 1; 
		orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive,  now);
		emit Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
	}

	function makeOrder_USD(address _tokenGet, uint256 _amountGet, address _tokenGive,  uint256 _amountGive) public {
	 	orderCount += 1; 
	 	orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive,  now);
	 	emit Order_USD(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
	 }

	function makeOrder_sETH(address _tokenGet, uint256 _amountGet, address _tokenGive,  uint256 _amountGive) public {
	 	orderCount += 1; 
	 	orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive,  now);
	 	emit Order_sETH(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
	 }

	 function makeOrder_sOil(address _tokenGet, uint256 _amountGet, address _tokenGive,  uint256 _amountGive) public {
	 	orderCount += 1; 
	 	orders[orderCount] = _Order(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive,  now);
	 	emit Order_sOil(orderCount, msg.sender, _tokenGet, _amountGet, _tokenGive, _amountGive, now);
	 }


	function cancelOrder(uint256 _id) public {
		_Order storage _order = orders[_id];
		require(address(_order.user) == msg.sender);
		require(_order.id == _id);
		//must be my order
		//must be a valid order
		orderCancelled[_id]= true;
		emit Cancel(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
	}

	function cancelOrder_USD(uint256 _id) public {
	 	_Order storage _order = orders[_id];
	 	require(address(_order.user) == msg.sender);
	 	require(_order.id == _id);
	 	//must be my order
	 	//must be a valid order
	 	orderCancelled[_id]= true;
	 	emit Cancel_USD(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
	 }

	 function cancelOrder_sETH(uint256 _id) public {
	 	_Order storage _order = orders[_id];
	 	require(address(_order.user) == msg.sender);
	 	require(_order.id == _id);
	 	//must be my order
	 	//must be a valid order
	 	orderCancelled[_id]= true;
	 	emit Cancel_sETH(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
	 }

	 function cancelOrder_sOil(uint256 _id) public {
	 	_Order storage _order = orders[_id];
	 	require(address(_order.user) == msg.sender);
	 	require(_order.id == _id);
	 	//must be my order
	 	//must be a valid order
	 	orderCancelled[_id]= true;
	 	emit Cancel_sOil(_order.id, msg.sender, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive, now);
	 }

	function fillOrder(uint256 _id) public {
		require(_id > 0 && _id <= orderCount);
		require(!orderFilled[_id]);
		require(!orderCancelled[_id]);
		_Order storage _order = orders[_id];
		_trade(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
		//mark order as filled 
		orderFilled[_order.id] = true; 
	}

	function _trade(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal {

		//Fee paid by the user that fills the order
		//Fee  deducted from _amountGet

		uint256 _feeAmount  = _amountGive * feePercent / 100; 

		//Execute trade
		tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
		tokens[_tokenGet][_user] += _amountGet; 
		tokens[_tokenGet][feeAccount] += _feeAmount;
		tokens[_tokenGive][_user] -= _amountGive;
		tokens[_tokenGive][msg.sender] += _amountGive;

		//Emit trade event 
		emit Trade(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, now);
	}

	function fillOrder_USD(uint256 _id) public {
		require(_id > 0 && _id <= orderCount);
		require(!orderFilled[_id]);
		require(!orderCancelled[_id]);
		_Order storage _order = orders[_id];
		_trade_USD(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
		//mark order as filled 
		orderFilled[_order.id] = true; 
	}

	function _trade_USD(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal {

 	//Fee paid by the user that fills the order
	//Fee  deducted from _amountGet

	 	uint256 _feeAmount  = _amountGive * feePercent / 100; 

	 	//Execute trade
	 	tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
	 	tokens[_tokenGet][_user] += _amountGet; 
	 	tokens[_tokenGet][feeAccount] += _feeAmount;
	 	tokens[_tokenGive][_user] -= _amountGive;
	 	tokens[_tokenGive][msg.sender] += _amountGive;

	 	//Emit trade event 
	 	emit Trade_USD(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, now);
	 }



	 function fillOrder_sETH(uint256 _id) public {
		require(_id > 0 && _id <= orderCount);
		require(!orderFilled[_id]);
		require(!orderCancelled[_id]);
		_Order storage _order = orders[_id];
		_trade_sETH(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
		//mark order as filled 
		orderFilled[_order.id] = true; 
	}

	function _trade_sETH(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal {

 	//Fee paid by the user that fills the order
	//Fee  deducted from _amountGet

	 	uint256 _feeAmount  = _amountGive * feePercent / 100; 

	 	//Execute trade
	 	tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
	 	tokens[_tokenGet][_user] += _amountGet; 
	 	tokens[_tokenGet][feeAccount] += _feeAmount;
	 	tokens[_tokenGive][_user] -= _amountGive;
	 	tokens[_tokenGive][msg.sender] += _amountGive;

	 	//Emit trade event 
	 	emit Trade_sETH(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, now);
	 }


	function fillOrder_sOil(uint256 _id) public {
		require(_id > 0 && _id <= orderCount);
		require(!orderFilled[_id]);
		require(!orderCancelled[_id]);
		_Order storage _order = orders[_id];
		_trade_sOil(_order.id, _order.user, _order.tokenGet, _order.amountGet, _order.tokenGive, _order.amountGive);
		//mark order as filled 
		orderFilled[_order.id] = true; 
	}

	function _trade_sOil(uint256 _orderId, address _user, address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive) internal {

 	//Fee paid by the user that fills the order
	//Fee  deducted from _amountGet

	 	uint256 _feeAmount  = _amountGive * feePercent / 100; 

	 	//Execute trade
	 	tokens[_tokenGet][msg.sender] = tokens[_tokenGet][msg.sender] - (_amountGet + _feeAmount);
	 	tokens[_tokenGet][_user] += _amountGet; 
	 	tokens[_tokenGet][feeAccount] += _feeAmount;
	 	tokens[_tokenGive][_user] -= _amountGive;
	 	tokens[_tokenGive][msg.sender] += _amountGive;

	 	//Emit trade event 
	 	emit Trade_sOil(_orderId, _user, _tokenGet, _amountGet, _tokenGive, _amountGive, msg.sender, now);
	 }

	//Oracle function

    
    //Returns the latest price
     
    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }
	

}






























