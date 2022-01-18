pragma solidity >=0.6.0 <0.8.0;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract ERC20Mintable is ERC20 {

    mapping(address => bool) public minterlist;

	constructor(string memory name, string memory symbol) public ERC20(name, symbol) 
	{
       minterlist[msg.sender] = false; //on preset l'adresse comme étant non-abilité à mint, si on veut la changer on appelle la fct 
       //setMinter
	}


	function setMinter(address minterAddress, bool isMinter)  external
    {
        minterlist[minterAddress] = isMinter;
    }

	function mint(address toAddress, uint256 amount)  external
    {
        require(minterlist[msg.sender]==true);
        _mint(toAddress,amount);
    }

    function burn(address toAddress, uint256 amount)  external
    {
        require(minterlist[msg.sender]==true);
        _burn(toAddress,amount);
    }

	function isMinter(address minterAddress) external returns (bool)
    {
        return minterlist[minterAddress];
    }

}