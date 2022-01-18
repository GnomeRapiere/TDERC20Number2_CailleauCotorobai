
var TDErc20 = artifacts.require("ERC20TD.sol");
var ERC20Claimable = artifacts.require("ERC20Claimable.sol");
var evaluator = artifacts.require("Evaluator.sol");
var exercice = artifacts.require("ExerciceSolution.sol")
var ERC20Mintable = artifacts.require("ERC20Mintable.sol");


module.exports = (deployer, network, accounts) => {
    deployer.then(async () => {
        // await deployTDToken(deployer, network, accounts); 
        // await deployEvaluator(deployer, network, accounts); 
        // await setPermissionsAndRandomValues(deployer, network, accounts); 
        // await deployRecap(deployer, network, accounts);
		await deployRinkeby(deployer,network,accounts);
		await deployExerciceSolution(deployer, network, accounts);
		 
    });
};

// async function deployTDToken(deployer, network, accounts) {
// 	TDToken = await TDErc20.new("TD-ERC20-101","TD-ERC20-101",web3.utils.toBN("20000000000000000000000000000"))
// 	ClaimableToken = await ERC20Claimable.new("ClaimableToken","CLTK",web3.utils.toBN("20000000000000000000000000000"))
// 	//myERC20Mintable = await ERC20Mintable.new("Chabot","CBT")
// }

async function deployRinkeby(deployer,network,accounts)
{
    TDToken= await TDErc20.at("0xccCf36429190773Fd604a808Cb03f682136B007e")
    Evaluator= await evaluator.at("0x1987D516D14eBf3025069504b1aD2257516C426a")
	ClaimableToken = await ERC20Claimable.at("0x754a4F8D05f9A4157C355d42E8334999Ea5d66c9")
}

// async function deployEvaluator(deployer, network, accounts) {
// 	Evaluator = await evaluator.new(TDToken.address, ClaimableToken.address)
// }

// async function setPermissionsAndRandomValues(deployer, network, accounts) {
// 	await TDToken.setTeacher(Evaluator.address, true)
// }

// async function deployRecap(deployer, network, accounts) {
// 	console.log("TDToken " + TDToken.address)
// 	console.log("ClaimableToken " + ClaimableToken.address)
// 	console.log("Evaluator " + Evaluator.address)
// }

async function deployExerciceSolution(deployer, network, accounts) {
	//await web3.eth.sendTransaction({ from:accounts[1],to:Evaluator.address, value:web3.utils.toWei("3", "ether")});
	myERC20Mintable = await ERC20Mintable.new("Chabot","CBT")
	getBalance = await TDToken.balanceOf(accounts[0]);
	console.log("Init balance:"+ getBalance.toString())

	// myERC20Claimable = await ERC20Claimable.new("Chabot","CBT",152520);
	// await myERC20Claimable.claimTokens();
	await ClaimableToken.claimTokens();
	//await Evaluator.submitExercice(ClaimableToken.address);
	//await Evaluator.submitExercice(myERC20Claimable.address);
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex0 balance" + getBalance.toString());

	//ex1

	await Evaluator.ex1_claimedPoints()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex1 balance" + getBalance.toString());

	//ex2

	exerciceSolution = await exercice.new(ClaimableToken.address, myERC20Mintable.address);
	await Evaluator.submitExercice(exerciceSolution.address);
	await myERC20Mintable.setMinter(exerciceSolution.address,true);
	await Evaluator.ex2_claimedFromContract();
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex2 balance" + getBalance.toString());

	//ex3

	await Evaluator.ex3_withdrawFromContract();
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex3 balance" + getBalance.toString());

	//ex4

	await ClaimableToken.approve(exerciceSolution.address,100000000000);
	await Evaluator.ex4_approvedExerciceSolution()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex4 balance" + getBalance.toString());

	//ex5

	await ClaimableToken.decreaseAllowance(exerciceSolution.address,100000000000); 
	await Evaluator.ex5_revokedExerciceSolution()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex5 balance" + getBalance.toString());

	//ex6

	await Evaluator.ex6_depositTokens()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex6 balance" + getBalance.toString());

	//ex7

	await Evaluator.ex7_createERC20();
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex7 balance" + getBalance.toString());

	//ex8
	
	await Evaluator.ex8_depositAndMint()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex8 balance" + getBalance.toString());

	//ex9

	await exerciceSolution.claimTokensOnBehalf(); //essentiel pour avoir assez de tokens à withdraw (car on les a déjà withdraw en exo 3)
	await Evaluator.ex9_withdrawAndBurn()
	getBalance= await TDToken.balanceOf(accounts[0]);
	console.log("Ex9 balance" + getBalance.toString());

}

