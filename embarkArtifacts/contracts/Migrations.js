import EmbarkJS from '../embarkjs';

const MigrationsConfig = {"abiDefinition":[{"constant":false,"inputs":[{"name":"_newAddress","type":"address"}],"name":"upgrade","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0x0900f010"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","signature":"0x8da5cb5b"},{"constant":true,"inputs":[],"name":"lastCompletedMigration","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","signature":"0xfbdbad3c"},{"constant":false,"inputs":[{"name":"_completed","type":"uint256"}],"name":"setCompleted","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function","signature":"0xfdacd576"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor","name":"constructor","signature":"constructor"}],"deployedAddress":"0x3143f48f589748b7Fce3486a09a99CA76F0174F2","className":"Migrations","args":[],"gas":177700,"gasPrice":"20000000000","silent":false,"track":true,"deploy":true,"realRuntimeBytecode":"608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f010146100515780638da5cb5b14610079578063fbdbad3c1461009d578063fdacd576146100b7575b600080fd5b6100776004803603602081101561006757600080fd5b50356001600160a01b03166100d4565b005b610081610151565b604080516001600160a01b039092168252519081900360200190f35b6100a5610160565b60408051918252519081900360200190f35b610077600480360360208110156100cd57600080fd5b5035610166565b6000546001600160a01b031633141561014e576000819050806001600160a01b031663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561013457600080fd5b505af1158015610148573d6000803e3d6000fd5b50505050505b50565b6000546001600160a01b031681565b60015481565b6000546001600160a01b031633141561014e5760015556fea265627a7a7230582026444f9bce2fd5a861","realArgs":[],"code":"608060405234801561001057600080fd5b50600080546001600160a01b031916331790556101b3806100326000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f010146100515780638da5cb5b14610079578063fbdbad3c1461009d578063fdacd576146100b7575b600080fd5b6100776004803603602081101561006757600080fd5b50356001600160a01b03166100d4565b005b610081610151565b604080516001600160a01b039092168252519081900360200190f35b6100a5610160565b60408051918252519081900360200190f35b610077600480360360208110156100cd57600080fd5b5035610166565b6000546001600160a01b031633141561014e576000819050806001600160a01b031663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561013457600080fd5b505af1158015610148573d6000803e3d6000fd5b50505050505b50565b6000546001600160a01b031681565b60015481565b6000546001600160a01b031633141561014e5760015556fea265627a7a7230582026444f9bce2fd5a861f95f23e21bc91d69f2ca0eb553029b7a00a9df5cc0995c64736f6c634300050a0032","runtimeBytecode":"608060405234801561001057600080fd5b506004361061004c5760003560e01c80630900f010146100515780638da5cb5b14610079578063fbdbad3c1461009d578063fdacd576146100b7575b600080fd5b6100776004803603602081101561006757600080fd5b50356001600160a01b03166100d4565b005b610081610151565b604080516001600160a01b039092168252519081900360200190f35b6100a5610160565b60408051918252519081900360200190f35b610077600480360360208110156100cd57600080fd5b5035610166565b6000546001600160a01b031633141561014e576000819050806001600160a01b031663fdacd5766001546040518263ffffffff1660e01b815260040180828152602001915050600060405180830381600087803b15801561013457600080fd5b505af1158015610148573d6000803e3d6000fd5b50505050505b50565b6000546001600160a01b031681565b60015481565b6000546001600160a01b031633141561014e5760015556fea265627a7a7230582026444f9bce2fd5a861f95f23e21bc91d69f2ca0eb553029b7a00a9df5cc0995c64736f6c634300050a0032","linkReferences":{},"swarmHash":"f95f23e21bc91d69f2ca0eb553029b7a00a9df5cc0995c64736f6c634300050a","gasEstimates":{"creation":{"codeDepositCost":"87000","executionCost":"20370","totalCost":"107370"},"external":{"lastCompletedMigration()":"420","owner()":"437","setCompleted(uint256)":"20475","upgrade(address)":"infinite"}},"functionHashes":{"lastCompletedMigration()":"fbdbad3c","owner()":"8da5cb5b","setCompleted(uint256)":"fdacd576","upgrade(address)":"0900f010"},"filename":"C:/Users/Spha/Documents/Github/block.difficulty/.embark/contracts/Migrations.sol","originalFilename":"contracts\\Migrations.sol","path":"C:\\Users\\Spha\\Documents\\Github\\block.difficulty\\contracts\\Migrations.sol","type":"file","deploymentAccount":"0x6Bb26B7893C6Aad51A429F445E0F9a625B0ef3E0","transactionHash":"0x4290cbb9dafeef0b57914dabf0c41c838b9d9cf5c00bb9f509f803133f57e626"};
const Migrations = new EmbarkJS.Blockchain.Contract(MigrationsConfig);

export default Migrations;
