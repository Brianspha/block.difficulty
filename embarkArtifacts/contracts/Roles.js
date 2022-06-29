import EmbarkJS from '../embarkjs';

const RolesConfig = {"abiDefinition":[],"deployedAddress":"0x94995c9990910292aF71FC547D6EA9491FD56d27","className":"Roles","args":[],"gas":73170,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a72305820d53a26ec0fd85d6f2a","realArgs":[],"code":"60556023600b82828239805160001a607314601657fe5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a72305820d53a26ec0fd85d6f2abc41d5a5a799859369c71c656d1db04c40459d55b6daa164736f6c634300050a0032","runtimeBytecode":"73000000000000000000000000000000000000000030146080604052600080fdfea265627a7a72305820d53a26ec0fd85d6f2abc41d5a5a799859369c71c656d1db04c40459d55b6daa164736f6c634300050a0032","linkReferences":{},"swarmHash":"bc41d5a5a799859369c71c656d1db04c40459d55b6daa164736f6c634300050a","gasEstimates":{"creation":{"codeDepositCost":"17000","executionCost":"94","totalCost":"17094"},"internal":{"add(struct Roles.Role storage pointer,address)":"infinite","has(struct Roles.Role storage pointer,address)":"infinite","remove(struct Roles.Role storage pointer,address)":"infinite"}},"functionHashes":{},"filename":"/Users/siphamandlamjoli/Documents/GitHub/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/access/Roles.sol","originalFilename":"contracts//Users/siphamandlamjoli/Documents/GitHub/block.difficulty/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/access/Roles.sol","path":"/Users/siphamandlamjoli/Documents/GitHub/block.difficulty/contracts/.embark/node_modules/@openzeppelin/contracts-ethereum-package/contracts/access/Roles.sol","type":"file","deploymentAccount":"0xb764e9a22978B396AE9668FD60D9B3f5737dE2ee","transactionHash":"0xa3b085e494401dcd60b473f05b652e6ce401f0b2652ce4ece428a0bea433639d"};
const Roles = new EmbarkJS.Blockchain.Contract(RolesConfig);

export default Roles;
