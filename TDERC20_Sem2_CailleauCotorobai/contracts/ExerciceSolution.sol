pragma solidity ^0.6.0;
import "./ERC20Claimable.sol";
import "./ERC20Mintable.sol";



contract ExerciceSolution 
{
	ERC20Claimable claimableERC20;
	ERC20Mintable mintableERC20;
	mapping(address => uint256) public amountminted;


	constructor(ERC20Claimable _claimableERC20, ERC20Mintable _mintableERC20) 
	public 
	{
		claimableERC20 = _claimableERC20;
		mintableERC20 = _mintableERC20;
	}

	function claimTokensOnBehalf() external
	{
		uint256 balancebefore = claimableERC20.balanceOf(address(this));
		claimableERC20.claimTokens();
		uint256 balanceafter = claimableERC20.balanceOf(address(this));
		amountminted[msg.sender] += balanceafter - balancebefore;
		mintableERC20.mint(msg.sender, amountminted[msg.sender]);
	}

	function tokensInCustody(address callerAddress) external returns (uint256)
	{
		return amountminted[msg.sender];

	}

	function withdrawTokens(uint256 amountToWithdraw) external returns (uint256)
	{
		claimableERC20.transfer(msg.sender,amountToWithdraw);
		amountminted[msg.sender] = amountminted[msg.sender] - amountToWithdraw;
		mintableERC20.burn(msg.sender, amountToWithdraw);

		return amountminted[msg.sender];
	}

	function depositTokens(uint256 amountToWithdraw) external returns (uint256)
	{
		claimableERC20.transferFrom(msg.sender, address(this), amountToWithdraw);
		amountminted[msg.sender] = amountminted[msg.sender] + amountToWithdraw;
		mintableERC20.mint(msg.sender, amountToWithdraw);

		return amountminted[msg.sender];
	}

	function getERC20DepositAddress() external returns (address)
	{
		return address(mintableERC20);
	}
}
