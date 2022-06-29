import EmbarkJS from '../embarkjs';

const CarefulMathConfig = {"abiDefinition":[],"deployedAddress":"0xc2EF82586Fa386416e25e7810B77Dcd08a4727dd","className":"CarefulMath","args":[],"gas":66998,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"6080604052600080fdfea265627a7a72305820bfa5801912c0322f61","realArgs":[],"code":"6080604052348015600f57600080fd5b50603e80601d6000396000f3fe6080604052600080fdfea265627a7a72305820bfa5801912c0322f61568b65b9eaf76f1d40d51cb8897f7d4ea5ff70bb65ef1464736f6c634300050a0032","runtimeBytecode":"6080604052600080fdfea265627a7a72305820bfa5801912c0322f61568b65b9eaf76f1d40d51cb8897f7d4ea5ff70bb65ef1464736f6c634300050a0032","linkReferences":{},"swarmHash":"568b65b9eaf76f1d40d51cb8897f7d4ea5ff70bb65ef1464736f6c634300050a","gasEstimates":{"creation":{"codeDepositCost":"12400","executionCost":"66","totalCost":"12466"},"internal":{"addThenSubUInt(uint256,uint256,uint256)":"infinite","addUInt(uint256,uint256)":"infinite","divUInt(uint256,uint256)":"infinite","mulUInt(uint256,uint256)":"infinite","subUInt(uint256,uint256)":"infinite"}},"functionHashes":{},"filename":"/Users/siphamandlamjoli/Documents/GitHub/block.difficulty/.embark/contracts/shared-contracts/compound/CarefulMath.sol","originalFilename":"contracts/shared-contracts/compound/CarefulMath.sol","path":"/Users/siphamandlamjoli/Documents/GitHub/block.difficulty/contracts/shared-contracts/compound/CarefulMath.sol","type":"file","deploymentAccount":"0xb764e9a22978B396AE9668FD60D9B3f5737dE2ee","transactionHash":"0xd22d6449a416a7a3a331f984cd5054e916b7ef9f28a4654690bac9e7faec30e9"};
const CarefulMath = new EmbarkJS.Blockchain.Contract(CarefulMathConfig);

export default CarefulMath;
