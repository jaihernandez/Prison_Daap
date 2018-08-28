//var SimpleBank = artifacts.require("./SimpleBank.sol");
var Prison = artifacts.require("./Prison.sol");

module.exports = function(deployer) {
  //deployer.deploy(SimpleBank);
  deployer.deploy(Prison);
};
